import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

//* Service //
import { WorkOrderService } from '../service';
  
@ValidatorConstraint( { name: 'GetWorkOrder', async: true } )
@Injectable( )
export class GetWorkOrder implements ValidatorConstraintInterface {

  constructor( 

    private readonly workOrderService: WorkOrderService
    
  ) { }

  async validate( workOrder: string ): Promise<boolean> { 
    
    try {

      await this.workOrderService.findOneByWorkOrder_decorator( workOrder );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `workOrder ${ args.object['workOrder'] } already exist`;

  };

}

