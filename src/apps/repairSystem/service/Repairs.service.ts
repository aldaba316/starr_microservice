import { ConflictException, Injectable, Inject, NotFoundException } from "@nestjs/common";

//* DTO //
import { RepairDTO, CloseRepairReplaceDTO, CloseRepairDTO } from "../dto";

//* Service //
import { UserService } from '../../shared/service/User.service';
import { RepairSolutionService } from "./RepairSolution.service";

//* Mongoose //
import { Types, Model } from 'mongoose';

//* Interface //
import * as I from '../interface';

//* Global //
import { updateHeader } from '../../shared/global/updateHeader';
import { AppGateway } from '../../../app.gateway';


@Injectable( )
export class OpenRepairService {

    constructor( 

        //! Collection inyection //
        @Inject( 'Repair' ) 
        private readonly openRepairInterface: Model<I.OpenRepairInterface>,
        private readonly userService: UserService,
        private readonly repairSolutionService: RepairSolutionService,
        private readonly appGateway: AppGateway

     ) { }

    //! Open Repair //
    public async create( repairDTO: RepairDTO, user: any ): Promise<I.OpenRepairInterface> {

        repairDTO[ '_generatedBy' ] = user[ '_id' ];
            
        const newRepair = await this._saveOpenRepair( repairDTO );
        
        this.appGateway.emitEventTo( newRepair.assignTo.socketID, '_assignTo', newRepair );
        this.appGateway.emitEvent( 'emitRepair', { 'event': 'create', data: newRepair } );
            
        return newRepair;

    };

    //! SSN with an open repair //
     public async ssnHasRepair( SSN: string ): Promise<string> {

        const query = { $and: [ { SSN }, { _solution: null } ] };
        const found = await this.openRepairInterface.findOne( query );

        if ( found )
            throw new ConflictException( `this SSN ${ SSN } already has and open repair` )
                     
        return 'Go ahead';

     };

    //! Populate after saving data returns a promise not a callback //
    public async _saveOpenRepair( repairDTO: RepairDTO ): Promise<I.OpenRepairInterface> { 

        return new Promise( async ( resolve, reject ) => {

            const data = new this.openRepairInterface( repairDTO );
    
            await data.save( ( error , repair ) => {

                if ( error ) 
                    reject ( error );

                    repair.populate( '_board', 'boardName boardNodes')
                    repair.populate( '_runningTest', 'test')
                    repair.populate( '_errorCode', 'code description')
                    repair.populate( '_solution' )
                    repair.populate( '_family', 'desc nodeQty', async ( error, data )  => {

                        if ( error ) 
                            reject ( error );

                        const { username, socketID } = await this.userService._getUser( data._assignTo );
                        const { _assignTo, ...extra } = data[ '_doc' ];
                        
                        const assignTo = { username, socketID };
                        
                        resolve ( { ...extra, assignTo } );
                    
                });
            });

        } );

    };

    //! GET repairs ( open/close  ) // 
    public async findAll( from = 0, limit = 5, filter: string ): Promise<I.OpenRepairPagination> {

        const query = { $and: [ 
            { active: true }, 
            { _solution: filter == 'open' ? null : { $ne: null } } 
        ] };
    
        const [ total, repairs ] = await Promise.all([
    
            this.openRepairInterface.countDocuments( query ),
            this.openRepairInterface.find( query )
                .populate( '_board','boardName boardNodes' )  
                .populate( '_runningTest', 'test' )
                .populate( '_errorCode', 'code description' )
                .populate( '_family', 'desc nodeQty' )
                .populate( '_solution' )
                .lean( )
                .skip( Number( from ) )
                .limit( Number( limit ) )
                    
        ]); 
      
        if ( !repairs.length ) 
                throw new ConflictException( `Data not found` );
    
        for ( const repair of repairs ) 
                repair.techRepair = await this.userService._getUser( repair._assignTo );
                
        return { total, repairs };
        
    };

    //! Could not close and closed repair //
    public async alreadyClosed( _solution ): Promise<string> {

        if ( !_solution )
            return 'Go ahead'

        throw new ConflictException( 'Repair already closed' );

    };

    //! Action must be... //
    public async actionMustbe( action: string, shouldbe: string ): Promise<string> {

        if ( action == shouldbe ) 
                return 'Go ahead';

        throw new ConflictException( 'Action must be Replace' );

    };

     //! Action must not be... //
     public async actionMustNotbe( action: string, shouldbe: string ): Promise<string> {

        if ( action == shouldbe )
            throw new ConflictException( 'Invalid action' )

        return 'Go ahead';

    };

     //! Close repair ( Not Replace )//
     public async updateRepair_closeRepair( closeRepairDTO: CloseRepairDTO, RepairID: Types.ObjectId ) : Promise<I.OpenRepairInterface> {

        const repair = await this.findOne( RepairID );

        const [ , , solution ] = await Promise.all( [

            this.alreadyClosed( repair._solution ),
            this.actionMustNotbe( closeRepairDTO.actionTaked ,'Replace' ),
            this.repairSolutionService.create( closeRepairDTO )

        ] );

        const [ , updated, generatedBy  ] = await Promise.all( [

            this.repairSolutionService.patchRepairSoluction_repair(  solution[ '_id' ], repair[ '_id' ] ),
            this.openRepairInterface.findByIdAndUpdate( RepairID, { $set: { '_solution': solution['_id'] }, updateHeader } ),
            this.userService._getUser( repair._generatedBy )

        ] );

        this.appGateway.emitEventTo( generatedBy.socketID, '_generatedBy', updated );
        this.appGateway.emitEvent( 'emitRepair', { 'event': 'close', data: updated } );

        return updated;

    };

    //! Close repair ( Replace )//
    public async updateRepair_closeRepairReplace ( closeRepairReplaceDTO: CloseRepairReplaceDTO, RepairID: Types.ObjectId ) : Promise<I.OpenRepairInterface> {

        const repair = await this.findOne( RepairID );

        const [ , , solution ] = await Promise.all( [

            this.alreadyClosed( repair._solution ),
            this.actionMustbe( closeRepairReplaceDTO.actionTaked ,'Replace' ),
            this.repairSolutionService.createReplace( closeRepairReplaceDTO )

        ] );
        
        const [ , updated, generatedBy ] = await Promise.all( [

            this.repairSolutionService.patchRepairSoluction_repair(  solution[ '_id' ], repair[ '_id' ] ),
            this.openRepairInterface.findByIdAndUpdate( RepairID, { $set: { '_solution': solution['_id'] }, updateHeader } ),
            this.userService._getUser( repair._generatedBy )

        ] );

        this.appGateway.emitEventTo( generatedBy.socketID, '_generatedBy', updated );
        this.appGateway.emitEvent( 'emitRepair', { 'event': 'close', data: updated } );

        return updated;

    };

    //! GET repair by _id //
    public async findOne( _id: Types.ObjectId ): Promise<I.OpenRepairInterface> {

        const data = await this.openRepairInterface.findById( _id )
                .populate( '_board','boardName boardNodes' )  
                .populate( '_runningTest', 'test' )
                .populate( '_errorCode', 'code description' )
                .populate( '_family', 'desc nodeQty' )
                .populate( '_solution' )
                .lean( );

        if ( !data )
            throw new NotFoundException( `Repair _id ${ _id } not found` );

        if ( !data.active )
            throw new NotFoundException( `Repair _id ${ _id } not longer exist` );
                
        data.techRepair = await this.userService._getUser( data._assignTo );

        return data;

    };

    //! GET repair by SSN //
    public async findOneBySSN( from = 0, limit = 5, SSN: string ): Promise<I.OpenRepairPagination> {

        const query = { SSN };

        const [ total, repairs ] = await Promise.all([
    
            this.openRepairInterface.countDocuments( query ),
            this.openRepairInterface.find( query )
                .populate( '_board','boardName boardNodes' )  
                .populate( '_runningTest', 'test' )
                .populate( '_errorCode', 'code description' )
                .populate( '_family', 'desc nodeQty' )
                .populate( '_solution' )
                .lean( )
                .skip( Number( from ) )
                .limit( Number( limit ) )
                    
        ]); 
      
        if ( !repairs.length ) 
            throw new ConflictException( `Data not found` );
    
        for ( const repair of repairs ) 
                repair.techRepair = await this.userService._getUser( repair._assignTo );
                
        return { total, repairs };

    };

    //! GET repair by SSN Autocomplete //
    public async findOne_autocompleteBySSN ( value: string ) : Promise<any> {

        const data = await this.openRepairInterface.aggregate([
            {
                $addFields: {
                    fullString: { $concat: ["$SSN"] },
                }
            },
            { $match: { fullString: { $regex: value } } },
            { $lookup: { from: 'Board', localField: '_board', foreignField: '_id', as: '_board' } },
            { $lookup: { from: 'RunningTest', localField: '_runningTest', foreignField: '_id', as: '_runningTest' } },
            { $lookup: { from: 'ErrorCode', localField: '_errorCode', foreignField: '_id', as: '_errorCode' } },
            { $lookup: { from: 'Family', localField: '_family', foreignField: '_id', as: '_family' } },
            { $lookup: { from: 'FailComponent', localField: '_componentRepaired', foreignField: '_id', as: '_componentRepaired' } },
        
        ]);
    
        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
    
        for ( const repair of data ) 
            repair.techRepair = await this.userService._getUser( repair._assignTo );
    
        return data;

    };

    //! Get repairs ( by userID, _assignTo/_generatedBy, open/close ) //
    public async findAll_byUser( from = 0, limit = 5, filter: string, userID: Types.ObjectId, status: string ) {

        const query = { 

            $and : [ { active: true }, { [ filter ]: userID }, { '_solution': status == 'open' ? null : { $ne: null } } ]

         };

        const [ total, data ] = await Promise.all( [

            this.openRepairInterface.countDocuments( query ),
            this.openRepairInterface.find( query )
                .skip( Number( from ) )
                .limit( Number( limit ) )
                .populate( '_board', 'boardName boardNodes' )
                .populate( '_runningTest', 'test' )
                .populate( '_errorCode', 'code description' )
                .populate( '_family', 'desc nodeQty' )
                .populate( '_solution' )

        ] )

        return { total, data };

    };

}