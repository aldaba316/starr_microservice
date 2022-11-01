
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { FamilyDTO } from "../dto";

//* Interface //
import { FamilyInterface, FamilyPagination } from "../interface";

//* Service //
import { FamilyService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";
 
//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/family' )
@ApiTags( 'Family' )
export class FamilyController {
 
    constructor( private readonly familyService: FamilyService ) { }

     //! POST Family //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
     )
     @ResponseDecorator( )
     @ApiOperation({
        description: 'Create Family',
      })
      @ApiBody({
        description: 'Data example',
        type: FamilyDTO,
        examples: {
          ejemplo1: {
            value: {
                desc: 'Azure 4.1',
                nodeQty: 16
            }
          }
        }
      })
    @Post( )
    public async _postFamily( 
        @GetUserFromRequest( ) userID: Types.ObjectId, @Body() FamilyDTO: FamilyDTO ): Promise<FamilyInterface> {

        return await this.familyService.create( FamilyDTO );

    }; 

    //! GET ALL FAMILIES // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all Families',
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
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<FamilyPagination> {
        
        return await this.familyService.findAll( from, limit );
    
    };

    //! GET Family by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Family by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'FamilyID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<FamilyInterface> {

        return await this.familyService.findOne( _id );

    };

    //*! GET Families by desc but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
         description: 'GET Families by desc Autocomplete',
    })
    @ApiQuery( {
         name:'value',
         type: String,
         required: true,
         description: 'Searchig value'
     } )
    @Get( '/autocomplete' )
     public async findAll_autocompleteByDesc( 
         @GetUserFromRequest( ) userID: Types.ObjectId,  @Query ('value' ) value: string ): Promise<FamilyPagination> {
 
         return await this.familyService.findAll_autocompleteByDesc( value );
 
     };

    //! GET Family by desc //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @Auth( validRoles.dev )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET Family by desc',
    })
    @ApiQuery( {
        name:'desc',
        type: String,
        required: true,
        description: 'Family Description'
    } )
    @Get( '/description' )
    public async findOneByDesc( @GetUserFromRequest( ) userID: Types.ObjectId, @Query ('desc' ) desc: string ): Promise<FamilyInterface> {

        return await this.familyService.findOneByDesc( desc );

    };

    //! PATCH Family by _id // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch Family by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: FamilyDTO,
        examples: {
            ejemplo1 : {
                value: {
                    desc: 'Azure 4.1',
                    nodeQty: 16
                }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( @GetUserFromRequest( ) userID: Types.ObjectId, @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, @Body( ) familyDTO: FamilyDTO ): Promise<FamilyInterface> {

        return await this.familyService.updateOne( familyDTO, _id );

    };

    //! DELETE Family by _id //
    @Auth( 
        validRoles.dev,
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE Family by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to delete',
        required: true
    } )
    @Delete( '/:_id' )
    public async deleteOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId,  
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<FamilyInterface> {
        
        return await this.familyService.deleteOne( _id );
   
    };

}