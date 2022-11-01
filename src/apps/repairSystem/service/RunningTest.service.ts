import { Injectable, Inject, ConflictException, NotFoundException } from "@nestjs/common";
//* DTO //
import { RunningTestDTO, PatchErrorCodeToRunningTestDTO } from "../dto";

//* Interface //
import { RunningTestInterface, RunningTestPagination } from "../interface";

//* Mongoose //
import { Model, Types } from 'mongoose';

//* Global //
import { updateHeader }  from '../../shared/global/updateHeader';

//* Service //
import { ErrorCodeService } from '../service';
import { MainService } from '../service/index';
import { LoggerService } from "../../../logger/logger.service";

@Injectable( )
export class RunningTestService {

    constructor( 

        //! Collection inyection //
        @Inject( 'RunningTest' ) 
        private readonly runningTestInterface: Model<RunningTestInterface>,
        private readonly errorCodeService: ErrorCodeService,
        private readonly mainService: MainService,
        private readonly loggerService: LoggerService

    ) { } 

    //! POST Running Test //
    public async create( runningTestDTO: RunningTestDTO ): Promise<RunningTestInterface> {

        const data = new this.runningTestInterface( runningTestDTO );
        return await data.save( );

    }; 
    
     //! GET RuningTest by test Autocomplete //
     public async findAll_autocompleteByTest ( value: string ) : Promise<any> {

        const data = await this.runningTestInterface.aggregate([
            { $addFields: { fullString: { $concat: ["$test"] } } },
            { $match: { fullString: { $regex: value } } },
            { $lookup: { from: 'ErrorCode', localField: '_errorCode', foreignField: '_id', as: '_errorCode' } },
        ]);

        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
    
        return data;

    };

    //! GET tests //
    public async findAll( from = 0, limit = 5 ): Promise<RunningTestPagination> {

        const query = { active: true };

        const [ total, tests ] = await Promise.all([

            this.runningTestInterface.countDocuments(query),
            this.runningTestInterface.find(query)
                .skip( Number( from ) )
                .limit( Number( limit ) )
                     
        ]);

        if ( !tests.length ) 
            throw new NotFoundException( `Data not found` );
    
        return { total, tests };

    };

     //! GET test by _id //
     public async findOne( _id: Types.ObjectId ): Promise<RunningTestInterface> {

        const data = await this.runningTestInterface.findById( _id ).populate( '_errorCode' );

        if ( !data ) 
            throw new ConflictException( `RunningTest _id not found ${ _id }` );

        if ( !data.active ) 
            throw new ConflictException( `RunningTest _id not longer exist ${ _id }` );

        return data;

    };

    //! GET test test Decorator //
    public async findOneByTest_decorator( test: string ): Promise<string> {

        const data = await this.runningTestInterface.findOne( { test } );

        if ( data ) 
            throw new ConflictException( `RunningTest ${ test } already exist` );

        return 'Go ahead';

    };
    
     //! PATCH test by _id //
    public async updateOne( _id: Types.ObjectId , { test } ): Promise<RunningTestInterface> {

        const data = await this.runningTestInterface.findByIdAndUpdate( _id, { test }, updateHeader );

        if ( !data ) 
            throw new ConflictException( `Data not updated` );

        return data;

    };

    //! Patch error Code to Running Test //
    public async updateOne_patchErrorCodeToRunningTest( { errorCodeID }: PatchErrorCodeToRunningTestDTO, runningTestID: Types.ObjectId ): Promise<RunningTestInterface>{

        try {

            await this.errorCodeService.findOne( errorCodeID );
            const { _errorCode } : RunningTestInterface = await this.findOne( runningTestID );

            const IDs = _errorCode.map( ( code ) => code['_id'] );
            
            await this.mainService.repeatedIdInArray( IDs, errorCodeID );

            const data = await this.runningTestInterface.findByIdAndUpdate( runningTestID, { $push: { '_errorCode' : errorCodeID }, updateHeader } );
            
            return data;

        } catch ( error ) {

            this.loggerService.error( JSON.stringify( { type: 'PATCH_UNHANDLED',  api:'_patchErrorCodeToRunningTest', error } ) );
            throw new ConflictException(  error.response ? error.response.message : error );

        };

    };

    //! DELETE test by _id //
    public async deleteOne( _id: Types.ObjectId  ): Promise<RunningTestInterface> {

        const data = await this.runningTestInterface.findByIdAndUpdate( _id, { active: false } );

        if ( !data ) 
            throw new ConflictException( `Data not deleted` );

        data.active = false;
        
        return data;

    };

};