import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

@ValidatorConstraint( { name: 'ValidatorVersion', async: true } )
@Injectable( )
export class ValidatorVersion implements ValidatorConstraintInterface {

  async validate( version: string ): Promise<boolean> { 
    
        const versionArr = [ 'QuickTest', 'Stress-FT' ];

        if ( versionArr.includes( version ) ) {

            return true;

        }

        return false
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Version must be [ 'QuickTest', 'Stress-FT' ]`;

  };

}


