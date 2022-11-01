
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //;
import { FailComponentDTO } from "../dto";

//* Interface //
import { FailComponentInterface, FailComponentPagination } from "../interface";

//* Service //
import { FailComponentService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";

//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/failComponent' )
@ApiTags( 'Fail Component' )
export class FailComponentController {

    constructor( private readonly failComponentService: FailComponentService ) { }

     //! POST Fail Component //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ], 
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    ) 
    @ResponseDecorator( )
    @ApiOperation({
        description: 'POST Fail Component',
    })
    @ApiBody({
        description: 'Data example',
        type: FailComponentDTO,
        examples: {
          ejemplo1: {
            value: {
                componentName: 'RIZER CARD'
            }
          }
        }
    })
    @Post( )
    public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId,  
        @Body() FailComponentDTO: FailComponentDTO ): Promise<FailComponentInterface> {

        return await this.failComponentService.create( FailComponentDTO );

    }; 

    //! GET ALL Fail Components // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all Fail Components',
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
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query( 'from' ) from: number, 
        @Query( 'limit' ) limit: number ): Promise<FailComponentPagination> {
        
        return await this.failComponentService.findAll( from, limit );
        
    };

    //*! GET FailComponents by componentName but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
         description: 'GET FailComponents by componentName Autocomplete',
    })
    @ApiQuery( {
         name:'value',
         type: String,
         required: true,
         description: 'Searchig value'
     } )
     @Get( '/autocomplete' )
     public async findAll_autocompleteByName( 
         @GetUserFromRequest( ) userID: any,  @Query ('value' ) value: string ): Promise<FailComponentPagination> {
 
         return await this.failComponentService.findAll_autocompleteByName( value );
 
    };

    //! GET Fail Components by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Fail Components by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'FailComponentID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<FailComponentInterface> {

        return await this.failComponentService.findOne( _id );

    };

    //! GET Fail Component by componentName //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ],
        validRoles[ 'starr-repairSystem-user-repairer' ] 
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Fail Component by componentName',
    })
    @ApiQuery( {
        name:'componentName',
        type: String,
        required: true,
        description: 'Component Name'
    } )
    @Get( '/findOneByName' )
    public async _get_by_desc( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('componentName' ) componentName: string ): Promise<FailComponentInterface> {

        return await this.failComponentService.findOneByName( componentName );

    };

    //! PATCH Family by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch Fail Component by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: FailComponentDTO,
        examples: {
            ejemplo1 : {
                value: {
                    componentName: 'RIZER CARD'
                }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) FailComponentDTO: FailComponentDTO ): Promise<FailComponentInterface> {

        return await this.failComponentService.updateOne( FailComponentDTO, _id );

    };

    //! DELETE Family by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-admin-repairer' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE Fail Component by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to delete',
        required: true
    } )
    @Delete( '/:_id' )
    public async deleteOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<FailComponentInterface> {
        
        return await this.failComponentService.deleteOne( _id );
   
    };

}