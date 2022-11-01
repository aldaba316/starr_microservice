
import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';
import { repairActions } from '../../shared/global/repairActions';

  //* Service //
import { OpenRepairService } from '../service';

  
@ValidatorConstraint( { name: 'ActiveRepair', async: true } )
@Injectable( )
export class ActiveRepair implements ValidatorConstraintInterface {

  constructor( 

    private readonly openRepairService: OpenRepairService
    
  ) { }

  async validate( SSN: string ): Promise<boolean> { 
 
    try {

      await this.openRepairService.ssnHasRepair( SSN );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `this SSN ${ args.object['SSN'] } already has and open repair`;

  };

}

@ValidatorConstraint( { name: 'RepairActions', async: true } )
@Injectable( )
export class RepairActions implements ValidatorConstraintInterface {
    
    async validate( action: string ): Promise<boolean> {  

        const _incl = repairActions.includes( action );

        if ( !_incl )  
            return false;

        return true;

  };

  defaultMessage( args: ValidationArguments ): string {

    return `Actions must be ${ repairActions }`;

  };

}

@ValidatorConstraint( { name: 'RepairPriority', async: true } )
@Injectable( )
export class RepairPriority implements ValidatorConstraintInterface {

  async validate( priority: number ): Promise<boolean> {  

      const priorities = [ 1, 2, 3 ];

      const _incl = priorities.includes( priority );

      if ( !_incl ) {

        return false;

      };

      return true;
    
  };

  defaultMessage( args: ValidationArguments ): string {

    return `Priority should be [ 1, 2, 3 ]`;

  };

}




