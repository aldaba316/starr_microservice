
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';

//* Mongosee //
import { Model, Types } from 'mongoose';

//* Interface //
import { WorkOrderInterface, WorkOrderPagination } from '../interface';

//* DTO // 
import { WorkOrderDTO } from '../dto/';

//* Global //
import { updateHeader } from '../../shared/global/updateHeader';

@Injectable()
export class WorkOrderService {
    
  constructor( 

    @Inject( 'WorkOrder' ) 
        private readonly workOrderInterface: Model<WorkOrderInterface>

  ) {}

  //! POST WorkOrder //
  public async create( workOrderDTO: WorkOrderDTO ): Promise<WorkOrderInterface> {

    const new_workOrderInterface = new this.workOrderInterface( workOrderDTO );

    return await new_workOrderInterface.save( );

  };

  //! GET WorkOrder by _id  //
  public async findOne( _id: Types.ObjectId ): Promise<WorkOrderInterface> {

    const data = await this.workOrderInterface.findById( _id );

    if ( !data ) 
        throw new NotFoundException( `_id ${ _id } not found` );

    if ( !data.active ) 
        throw new NotFoundException( `_id ${ _id } not longer exist` );
    
    return data;

  }; 

  //! GET WorkOrder by workOrder  //
  public async findOneByWorkOrder_decorator( workOrder: string ): Promise<string> {

    const data = await this.workOrderInterface.findOne( { workOrder } );

    if ( data ) 
        throw new NotFoundException( `workOrder ${ workOrder } already exist` );
    
    return 'Gp ahead';

  }; 

 //! GET WorkOrder by workOrder Autocomplete //
 public async findAll_autocompleteByWorkOrder ( value: string ) : Promise<any> {

    const data = await this.workOrderInterface.aggregate([
        { $addFields: { fullString: { $concat: ['$workOrder'] } } }, 
        { $match: { fullString: { $regex: value } } }
    ]);

    if ( !data.length ) 
        throw new NotFoundException( `Data not found` )

    return data;

};

  //! GET ALL WorkOrders  //
  public async findAll( from = 0, limit = 5 ): Promise<WorkOrderPagination> {

    const query = { active: true };

    const [ total, wos ] = await Promise.all([

        this.workOrderInterface.countDocuments(query),
        this.workOrderInterface.find(query)
            .skip( Number( from ) )
            .limit( Number( limit ) )
            
    ]);

    if ( !wos.length ) 
        throw new NotFoundException( `Data not found` );

    return { total, wos };

  };

  //! PATCH WorkOrder by _id  //
  public async updateOne( { workOrder }: WorkOrderDTO, _id: Types.ObjectId ): Promise<WorkOrderInterface> {

    const data = await this.workOrderInterface.findByIdAndUpdate( _id, { workOrder }, updateHeader );

    if ( !data ) 
        throw new ConflictException( `Data not updated...` );

    return data;

  };

  //! DELETE WorkOrder by _id  //
  public async deleteOne(  _id: Types.ObjectId ): Promise<WorkOrderInterface> {

    const data = await this.workOrderInterface.findByIdAndUpdate( _id, { active: false } );

    if ( !data ) 
        throw new ConflictException( `Data not deleted...` );

    data.active = false;

    return data;

  };

}
