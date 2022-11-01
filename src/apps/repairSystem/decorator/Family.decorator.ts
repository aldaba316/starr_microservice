import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { FamilyInterface } from '../interface';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  import { FamilyService } from '../service';
  
@ValidatorConstraint( { name: 'GetFamilyDesc', async: true } )
@Injectable( )
export class GetFamilyDesc implements ValidatorConstraintInterface {

  constructor( 

   //* Collection inyection //
   @Inject( 'Family' ) 
   private readonly familyInstance: Model<FamilyInterface>,  
    
  ) { }

  async validate( desc: string ): Promise<boolean> {  

      const exist = await this.familyInstance.findOne( { desc } );

      if ( exist ) 
            return false;
    
      return true; 
    
  };

  defaultMessage( args: ValidationArguments ): string {

    return `Family Desc already exist ${ args.object['desc'] } already exist`;

  };

}

@ValidatorConstraint( { name: 'GetFamilyID', async: true } )
@Injectable( )
export class GetFamilyID implements ValidatorConstraintInterface {

  constructor( 

    private readonly familyService: FamilyService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.familyService.findOne( _id );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Family _id ${ args.object['_family'] } not exist`;

  };

}
