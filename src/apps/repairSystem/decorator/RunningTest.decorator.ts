import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  //* Service //
import { RunningTestService } from '../service';

import { Types } from 'mongoose';

  
@ValidatorConstraint( { name: 'GetRunningTest', async: true } )
@Injectable( )
export class GetRunningTest implements ValidatorConstraintInterface {

  constructor( 

    private readonly runningTestService: RunningTestService
    
  ) { }

  async validate( test: string ): Promise<boolean> { 
    
    try {

      await this.runningTestService.findOneByTest_decorator( test );      
      
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Running Test ${ args.object['test'] } already exist`;

  };

}

@ValidatorConstraint( { name: 'GetRunningTestID', async: true } )
@Injectable( )
export class GetRunningTestID implements ValidatorConstraintInterface {

  constructor( 

    private readonly runningTestService: RunningTestService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.runningTestService.findOne( _id );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Running Test _id ${ args.object['_runningTest'] } not exist`;

  };

}
