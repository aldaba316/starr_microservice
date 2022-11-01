import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { ErrorCodeDTO } from "../dto";

//* Interface //
import { ErrorCodeInterface, ErrorCodePagination } from "../interface";

//* Service //
import { ErrorCodeService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";

//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/errorCode' )
@ApiTags( 'Error Code' )
export class ErrorCodeController {

    constructor( private readonly errorCodeService: ErrorCodeService ) { }

    //! POST Family //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ], 
    )
    @ResponseDecorator( )
    @ApiOperation({
        description: 'Create Error Code',
    })
    @ApiBody({
        description: 'Data example',
        type: ErrorCodeDTO,
        examples: {
          ejemplo1: {
            value: {
                code: 7894,
                description: 'chk_mellanox'
            }
          }
        }
    })
    @Post( )
      public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Body() ErrorCodeDTO: ErrorCodeDTO ): Promise<ErrorCodeInterface> {

        return await this.errorCodeService.create( ErrorCodeDTO );        

    };  

    //! GET ALL ErrorCodes // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all ErrorCodes',
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
        @Query( 'from' ) from: number, @Query( 'limit' ) limit: number, 
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<ErrorCodePagination> {
        
        return await this.errorCodeService.findAll( from, limit );
        
    };

    //*! GET ErrorCodes by description but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
          description: 'GET ErrorCodes by description Autocomplete',
    })
    @ApiQuery( {
          name:'value',
          type: String,
          required: true,
          description: 'Searchig value'
    } )
    @Get( '/autocomplete' )
    public async findAll_autocompleteByDescription( 
          @GetUserFromRequest( ) userID: any,  @Query ('value' ) value: string ): Promise<ErrorCodeInterface> {
  
          return await this.errorCodeService.findAll_autocompleteByDescription( value );
          
    };

    //! GET ErrorCode by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET ErrorCode by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'ErrorCode ID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<ErrorCodeInterface> {

        return await this.errorCodeService.findOne( _id );
        
    };

     //! GET Family by code //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
     )
     @ResponseDecorator( )
     @ApiOperation( {
        description: 'GET ErrorCode by code',
    })
    @ApiQuery( {
        name:'code',
        type: Number,
        required: true,
        description: 'Error Code'
    } )
    @Get( '/code' )
    public async findOneByCode( 
        @GetUserFromRequest( ) userID: Types.ObjectId, @Query ('code' ) code: number ): Promise<ErrorCodeInterface> {

        return await this.errorCodeService.findOneByCode( code );

    };

    //! PATCH Family by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch ErrorCode by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: ErrorCodeDTO,
        examples: {
            ejemplo1 : {
                value: {
                    code: 7894,
                    description: 'chk_mellanox'
                }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) ErrorCodeDTO: ErrorCodeDTO ): Promise<ErrorCodeInterface> {

        return await this.errorCodeService.updateOne( ErrorCodeDTO, _id );

    };

    //! DELETE Family by _id //
    @Auth( 
        validRoles.dev,  
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE ErrorCode by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to delete',
        required: true
    } )
    @Delete( '/:_id' )
    public async deleteOne( @GetUserFromRequest( ) userID: Types.ObjectId, @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<ErrorCodeInterface> {
        
        return await this.errorCodeService.deleteOne( _id );
   
    };

}