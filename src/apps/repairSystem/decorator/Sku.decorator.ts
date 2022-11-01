import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  //* Service //
import { SkuService } from '../service';

import { Types } from 'mongoose';

  
@ValidatorConstraint( { name: 'GetSku', async: true } )
@Injectable( )
export class GetSku implements ValidatorConstraintInterface {

  constructor( 

    private readonly skuService: SkuService
    
  ) { }

  async validate( sku: string ): Promise<boolean> { 
    
    try {

      await this.skuService.findOneBySku( sku );
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `SKU ${ args.object['sku'] } already exist`;

  };

}

