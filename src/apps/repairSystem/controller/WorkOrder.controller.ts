import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

//* DTO //
import { WorkOrderDTO } from "../dto";

//* Interface //
import { WorkOrderInterface, WorkOrderPagination } from "../interface";

//* Service //
import { WorkOrderService } from "../service";

//* Mongosse // 
import { Types } from 'mongoose';

//* Decorators //
import { ResponseDecorator, Auth, GetUserFromRequest } from "../../../common/decorator/";

//* Roles //
import { validRoles } from "../../shared/global/valid-roles";

//* Pipes //
import { ValidateMongoId } from '../../shared/pipes';

//* Service //
import { UserService } from "../../shared/service/User.service";

@Controller( 'api/v1/repairSystem/workOrder' )
@ApiTags( 'Work Order' )
export class WorkOrderController {

    constructor(

        private readonly workOrderService: WorkOrderService,
        private readonly userService: UserService

    ) { }

    //! POST Family // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation({
        description: 'POST Work Order',
    })
    @ApiBody({
        description: 'Data example',
        type: WorkOrderDTO,
        examples: {
          ejemplo1: {
            value: {
                workOrder: 1850002915
            }
          }
        }
    })
    @Post( )
      public async create( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Body() workOrderDTO: WorkOrderDTO ): Promise<WorkOrderInterface> {

        return await this.workOrderService.create( workOrderDTO );

    }; 

    //! GET ALL Work Orders // 
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET all Work Orders',
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
        @GetUserFromRequest( ) userID: Types.ObjectId ): Promise<WorkOrderPagination> {
        
        return await this.workOrderService.findAll( from, limit );
    
    };

    //! GET workOrder by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'GET workOrder by _id',
    })
    @ApiQuery( {
        name:'_id',
        type: String,
        required: true,
        description: 'workOrder _id'
    } )
    @Get( '/_id' )
    public async findOne( 
        @GetUserFromRequest( ) userID: Types.ObjectId, 
        @Query ('_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<WorkOrderInterface> {

        return await this.workOrderService.findOne( _id );

    };

    //*! GET WorkOrder by workOrder but with autocomplete //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-minion' ], 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
         description: 'GET WorkOrder by workOrder Autocomplete',
    })
    @ApiQuery( {
         name:'value',
         type: String,
         required: true,
         description: 'Searchig value'
     } )
    @Get( '/autocomplete' )
     public async findAll_autocompleteByWorkOrder( 
         @GetUserFromRequest( ) userID: any,  
         @Query ('value' ) value: string ): Promise<WorkOrderPagination> {
 
         return await this.workOrderService.findAll_autocompleteByWorkOrder( value );
 
     };

    //! PATCH WorkOrder by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'Patch WorkOrder by _id',
    })
    @ApiParam( {
        name:'_id',
        type: String,
        description:'_id you want to update',
        required: true
    } )
    @ApiBody({
      description: 'Data example',
      type: WorkOrderDTO,
      examples: {
        ejemplo1: {
          value: {
              workOrder: 1850002915
          }
        }
      }
   })
    @Patch( '/:_id' )
    public async updateOne( 
    @GetUserFromRequest( ) userID: Types.ObjectId, 
    @Param( '_id', ValidateMongoId ) _id: Types.ObjectId, 
    @Body( ) workOrderDTO: WorkOrderDTO ): Promise<WorkOrderInterface> {

        return await this.workOrderService.updateOne( workOrderDTO, _id );

    };

    //! DELETE WorkOrder by _id //
    @Auth( 
        validRoles.dev, 
        validRoles[ 'starr-repairSystem-guru' ]
    )
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'DELETE Work Order by _id',
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
        @Param( '_id', ValidateMongoId ) _id: Types.ObjectId ): Promise<WorkOrderInterface> {
        
        return await this.workOrderService.deleteOne( _id );
   
    }; 

}