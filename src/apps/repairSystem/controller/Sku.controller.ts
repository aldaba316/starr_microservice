
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { SkuDTO } from "../dto";

//* Interface //
import { SkuInterface, SkuPagination } from "../interface";

//* Service //
import { SkuService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";
 
//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/sku' )
@ApiTags( 'SKU' )
export class SkuController {

    constructor( private readonly skuService: SkuService ) { }

     //! POST SKU //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
     )
     @ResponseDecorator( )
     @ApiOperation({
        description: 'POST SKU',
     })
     @ApiBody({
        description: 'Data example',
        type: SkuDTO,
        examples: {
          ejemplo1: {
            value: {
                sku: 'M1141972-001'
            }
          }
        }
    })
    @Post( )
    public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId, @Body() skuDTO: SkuDTO ): Promise<SkuInterface> {

        return await this.skuService.create( skuDTO );

    }; 

    //*! GET SKU by sku but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
         description: 'GET SKU by sku Autocomplete',
    })
    @ApiQuery( {
         name:'value',
         type: String,
         required: true,
         description: 'Searchig value'
     } )
    @Get( '/autocomplete' )
     public async findAll_autocompleteBySKU( 
         @GetUserFromRequest( ) userID: any,  
         @Query ('value' ) value: string ): Promise<SkuInterface> {
 
         return await this.skuService.findAll_autocompleteBySKU( value );
 
     };

    //! GET ALL SKUs // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all SKU',
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
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<SkuPagination> {
        
        return await this.skuService.findAll( from, limit );
    
    };

    //! GET SKU by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET SKU by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'SKU _id'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<SkuInterface> {

        return await this.skuService.findOne( _id );

    }; 

    //! PATCH Sku by _id //
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
        type: SkuDTO,
        examples: {
            ejemplo1 : {
              value: {
                sku: 'M1141972-001'
              }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) skuDTO: SkuDTO ): Promise<SkuInterface> {

        return await this.skuService.updateOne( _id, skuDTO );

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
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<SkuInterface> {
        
        return await this.skuService.deleteOne( _id );
   
    };

}