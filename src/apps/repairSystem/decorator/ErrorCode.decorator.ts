import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

//* Service //
import { ErrorCodeService } from '../service';

import { Types } from 'mongoose';
  
@ValidatorConstraint( { name: 'GetErrorCode', async: true } )
@Injectable( )
export class GetErrorCode implements ValidatorConstraintInterface {

  constructor( 

    private readonly errorCodeService: ErrorCodeService
    
  ) { }

  async validate( code: number ): Promise<boolean> { 
    
    try {

      await this.errorCodeService.findOneByCode_decorator( code );      
      
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Error code ${ args.object['code'] } already exist`;

  };

}

@ValidatorConstraint( { name: 'GetErrorCodeID', async: true } )
@Injectable( )
export class GetErrorCodeID implements ValidatorConstraintInterface {

  constructor( 

    private readonly errorCodeService: ErrorCodeService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.errorCodeService.findOne( _id );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Error Code _id ${ args.object['_errorCode'] } not exist`;

  };

}

