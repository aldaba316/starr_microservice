import { Injectable, Inject, ConflictException, NotFoundException } from "@nestjs/common";

//* Mongoose //
import { Model, Types } from 'mongoose';

//* DTO //
import { BoardDTO, UserIdArrayDTO } from "../dto";

//* Interface //
import { BoardInterface, BoardsPagination } from "../interface";

//* Global //
import { updateHeader } from "../../shared/global/updateHeader";

//* Service //
import { UserService } from "../../shared/service/User.service";
import { AppGateway } from "../../../app.gateway";

@Injectable( )

export class BoardService {

    constructor(

         //! Collection inyection //
         @Inject( 'Board' ) 
         private readonly boardInterface: Model<BoardInterface>,

         private readonly userService: UserService,

         private readonly appGateway: AppGateway

     ) { }

    //! POST Board //
    public async create( BoardDTO: BoardDTO ): Promise<BoardInterface> {
    
        const data = new this.boardInterface( BoardDTO );
    
        return await data.save( );

    };

    //! GET users sending and ID //
    public async getUserPopulate ( user: Types.ObjectId[ ] ) {

        let users = [ ];
    
        for ( const userID of user ) {
    
            const user = await this.userService._getUser( userID );
            users = [ ...users, user ];
    
        };
    
        return users;

    };

    //! GET board by Name 
    public async findOneByName( boardName: string ): Promise<string> {

        const data = await this.boardInterface.findOne( { boardName } );

        if ( data )
            throw new ConflictException( `boardName ${ boardName } already exist` );

        return 'Go ahead';

    };

    //! GET Boards //
    public async findAll ( from = 0, limit = 5 ): Promise<BoardsPagination> {

        const query = { active: true };

        const [ total, boards ] = await Promise.all([
    
            this.boardInterface.countDocuments(query),
            this.boardInterface.find(query)
                .skip( Number( from ) )
                .limit( Number( limit ) )
                .lean( )
                    
        ]); 
    
        if ( !boards.length ) 
                    throw new NotFoundException( `Data not found` );
    
        for ( const board of boards ) {
    
            if ( board._user.length ) 
                board.techRepair = await this.getUserPopulate(  board._user );
    
        };

        await this.appGateway.emitEvent( 'test', 'Hola, soy el TurboMan' );
        
        return { total, boards };

    };

     //! GET repair by boardName Autocomplete //
     public async findAll_autocompleteByName ( value: string ) : Promise<any> {

        const data = await this.boardInterface.aggregate([
            { $addFields: { fullString: { $concat: ['$boardName'] } } },
            { $match: { fullString: { $regex: value } } }
        ]);
    
        if ( !data.length ) 
            throw new NotFoundException( `Data not found` )
    
        for ( const board of data ) {
    
            if ( board._user.length ) 
                board.techRepair = await this.getUserPopulate(  board._user );
        
        };
        
        return data;

    };

    //! GET Board by _id //
    public async findOne( _id: Types.ObjectId ): Promise<BoardInterface> {

        const data: BoardInterface = await this.boardInterface.findById( _id ).lean( );

        if ( !data ) 
            throw new ConflictException( `BoardID not found ${ _id }` );
    
        if ( !data.active ) 
            throw new ConflictException( `BoardID not longer exist ${ _id }` );
    
        data.techRepair = await this.getUserPopulate( data._user );
    
        return data;

    };

    //! PATCH Board by _id //
    public async updateOne( _id: Types.ObjectId, { boardName, boardNodes }: BoardDTO ): Promise<BoardInterface> {

        const data: BoardInterface = await this.boardInterface.findByIdAndUpdate( _id, { boardName, boardNodes }, updateHeader );

        if ( !data ) 
            throw new ConflictException( `Data not updated` );
    
        return data;

    };

    //! Patch userID in Board by ID //
    public async updateOne_UserIDToBoardID ( BoardID: Types.ObjectId, userIdArrayDTO: UserIdArrayDTO ): Promise<BoardInterface> {

        for ( const { userID } of userIdArrayDTO._users ) 
            await this.boardInterface.findByIdAndUpdate( BoardID, { $push: { '_user' : userID }, updateHeader } );
              
        return await this.findOne( BoardID );
            
    };

    //! DELETE Board by _id //
    public async deleteOne( _id: Types.ObjectId ): Promise<BoardInterface> {

        const data = await this.boardInterface.findByIdAndUpdate( _id, { active: false } );

        if ( !data ) 
            throw new ConflictException( `Data not updated` );
    
        data.active = false;
    
        return data;
      
    };

}