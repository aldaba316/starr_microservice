import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  //* Service //
import { FailComponentService } from '../service';

import { Types } from 'mongoose';

  
@ValidatorConstraint( { name: 'GetFailComponentID', async: true } )
@Injectable( )
export class GetFailComponentID implements ValidatorConstraintInterface {

  constructor( 

    private readonly failComponentService: FailComponentService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.failComponentService.findOne( _id );
      return true;

    } catch ( error ) {
      
      console.log( error );
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Fail Component _id ${ args.object['_componentRepaired'] } not exist`;

  };

}

@ValidatorConstraint( { name: 'GetFailComponentName', async: true } )
@Injectable( )
export class GetFailComponentName implements ValidatorConstraintInterface {

  constructor( 

    private readonly failComponentService: FailComponentService
    
  ) { }

  async validate( componentName: string ): Promise<boolean> { 
    
    try {

      await this.failComponentService.findOneByName_decorator( componentName );      
      
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Fail Component Name ${ args.object['componentName'] } already exist`;

  };

}

