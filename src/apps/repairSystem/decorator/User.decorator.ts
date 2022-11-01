import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  //* Service //
import { UserService } from '../../shared/service/User.service';

import { Types } from 'mongoose';

@ValidatorConstraint( { name: 'UserMustBeConnected', async: true } )
@Injectable( )
export class UserMustBeConnected implements ValidatorConstraintInterface {

  constructor( 

    private readonly userService: UserService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      const user = await this.userService._getUser( _id );

      if ( !user.socketID ) 
            return false;      
    
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `User _id ${ args.object['_assignTo'] } Disconnected`;

  };

}

@ValidatorConstraint( { name: 'GetUserID', async: true } )
@Injectable( )
export class GetUserID implements ValidatorConstraintInterface {

  constructor( 

    private readonly userService: UserService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.userService._getUser( _id );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage(  ): string {

    return `User _id not exist`;

  };

}

