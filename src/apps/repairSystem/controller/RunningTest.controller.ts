
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { RunningTestDTO, PatchErrorCodeToRunningTestDTO } from "../dto";

//* Interface //
import { RunningTestInterface, RunningTestPagination } from "../interface";

//* Service //
import { RunningTestService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";

//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

@Controller( 'api/v1/repairSystem/runningTest' )
@ApiTags( 'Running Test' )
export class RunningTestController {

    constructor( private readonly runningTestService: RunningTestService ) { }

     //! POST RuningTest //
     @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation({
        description: 'POST Running Test',
    })
    @ApiBody({
        description: 'These are the tests that are run in Starr',
        type: RunningTestDTO,
        examples: {
          ejemplo1: {
            value: {
                test: 'Functional Test'
            }
          }
        }
    })
    @Post( )
    public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Body() runningTestDTO: RunningTestDTO ): Promise<RunningTestInterface> {

        return await this.runningTestService.create( runningTestDTO );        

    }; 

    //! GET ALL RuningTests // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all RunningTest',
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
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<RunningTestPagination> {
        
        return await this.runningTestService.findAll( from, limit );
    
    };

    //*! GET RuningTest by test but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
         description: 'GET RuningTest by test Autocomplete',
    })
    @ApiQuery( {
         name:'value',
         type: String,
         required: true,
         description: 'Searchig value'
     } )
    @Get( '/autocomplete' )
     public async findAll_autocompleteByTest( 
         @GetUserFromRequest( ) userID: any,  
         @Query ('value' ) value: string ): Promise<RunningTestPagination> {
 
         return await this.runningTestService.findAll_autocompleteByTest( value );
 
     };

    //! GET RunningTest by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET RunningTest by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'RunningTest ID'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<RunningTestInterface> {

        return await this.runningTestService.findOne( _id );

    };

    //! PATCH RuningTest by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch RunningTest by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'RunningTest _id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: RunningTestDTO,
        examples: {
            ejemplo1 : {
                value: {
                    test: 'QuickTest'
                }
            }
        }
    } )
    @Patch( '/:_id' )
    public async updateOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) runningTestDTO: RunningTestDTO ): Promise<RunningTestInterface> {

        return await this.runningTestService.updateOne( _id, runningTestDTO );

    };

    //! PATCH ErrorCode to RunningTest // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'PATCH ErrorCode _id to RunningTest',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'RunningTest _id you want to update',
        required: true
    } )
    @ApiBody( {
        description: 'Data example',
        type: PatchErrorCodeToRunningTestDTO,
        examples: {
            ejemplo1 : {
                value: {
                    errorCodeID: '62daf6ebd284bb436fd3d656'
                }
            }
        }
    } )
    @Patch( 'patchErrorCodeToRunningTest/:_id' )
    public async updateOne_patchErrorCodeToRunningTest( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
        @Body( ) patchErrorCodeToRunningTestDTO: PatchErrorCodeToRunningTestDTO ): Promise<RunningTestInterface> {

        return await this.runningTestService.updateOne_patchErrorCodeToRunningTest( patchErrorCodeToRunningTestDTO, _id );

    };

    //! DELETE RuningTest by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE RunningTest by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'RunningTest _id you want to delete',
        required: true
    } ) 
    @Delete( '/:_id' )
    public async deleteOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<RunningTestInterface> {
        
        return await this.runningTestService.deleteOne( _id );
   
    };

}