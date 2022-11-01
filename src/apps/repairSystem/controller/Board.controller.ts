import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { BoardDTO, UserIdArrayDTO } from "../dto";

//* Interface //
import { BoardInterface, BoardsPagination } from "../interface";

//* Service //
import { BoardService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";

//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

//* Pipes //
import { BoardIDPipe } from "../pipe";

@Controller( 'api/v1/repairSystem/board' )
@ApiTags( 'Board' )
export class BoardController {

    constructor( private readonly boardService: BoardService ) { }

    //! POST Board //
    @Auth( validRoles.dev, validRoles[ 'starr-repairSystem-admin-repairer' ] )
    @ResponseDecorator( )
    @ApiOperation({
        description: 'POST Board',
    })
    @ApiBody({
        description: 'Data example',
        type: BoardDTO,
        examples: {
          ejemplo1: {
            value: {
                boardName: 'Board 1',
                boardNodes: 631
            }
          }
        }
    })
    @Post( )
    public async create( @GetUserFromRequest( ) userID: Types.ObjectId, @Body() boardDTO: BoardDTO ): Promise<BoardInterface> {

        return await this.boardService.create( boardDTO );

    };  

    //*! GET Boards by boardName but with autocomplete //
    @Auth( 
           validRoles.dev, 
           validRoles[ 'starr-repairSystem-minion' ], 
           validRoles[ 'starr-repairSystem-guru' ], 
           validRoles[ 'starr-repairSystem-admin-repairer' ],
           validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Boards by boardName Autocomplete',
    })
    @ApiQuery( {
        name:'value',
        type: String,
        required: true,
        description: 'Searchig value'
    } )
    @Get( '/autocomplete' )
    public async findAll_autocompleteByName( 
        @GetUserFromRequest( ) userID: Types.ObjectId,  @Query ('value' ) value: string ): Promise<BoardInterface> {

        return await this.boardService.findAll_autocompleteByName( value );        

    };

    //! GET ALL Board // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ], 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all Boards',
    })
    @ApiQuery( {
        name:'from',
        type: Number,
        description: 'From which position',
        required: false
    } )
    @ApiQuery( {
          name:'limit',
          type: Number,
          description: 'How many data', 
          required: false
    } )
    @Get( '/' )
    public async findAll( 
        @Query( 'from' ) from: number, 
        @Query( 'limit' ) limit: number,
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<BoardsPagination> {

        return await this.boardService.findAll( from, limit );        
    
    };

    //! GET Board by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ], 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Board by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'Board ID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<BoardInterface> {

        return await this.boardService.findOne( _id );        

    };

    //! PATCH Board by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch Board by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: BoardDTO,
        examples: {
            ejemplo1 : {
                value: {
                    boardName: 'Board 1',
                    boardNodes: '632 Nodes'
                }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( @GetUserFromRequest( ) userID: Types.ObjectId, @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, @Body( ) boardDTO: BoardDTO ): Promise<BoardInterface> {

        return await this.boardService.updateOne( _id, boardDTO );

    };

    //! PATCH user id to board //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch User _id to Board',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'Board _id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'User ID you want to PATCH',
        type: UserIdArrayDTO,
        examples: {
            ejemplo1 : {
                value: {
                    _users: [ 
                        {  
                            userID: '62ed6ecd9a326ac087bbf922'
                        }
                     ]
                }
            }
        }
    } )
    @Patch( 'patchUserToBoard/:_id' )
    public async updateOne_UserIDToBoardID( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId, BoardIDPipe ) _id: Types.ObjectId, 
        @Body( ) userIdArrayDTO: UserIdArrayDTO ): Promise<BoardInterface> {

        return await this.boardService.updateOne_UserIDToBoardID( _id, userIdArrayDTO );        

    };

    //! DELETE Board by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE Board by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to delete',
        required: true
    } )
    @Delete( '/:_id' )
    public async deleteOne( @GetUserFromRequest( ) userID: Types.ObjectId, @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<BoardInterface> {
        
        return await this.boardService.deleteOne( _id );
   
    };

}