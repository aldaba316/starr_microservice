import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  
@ValidatorConstraint( { name: 'ValidShift', async: true } )
@Injectable( )
export class ValidShift implements ValidatorConstraintInterface {
    
    async validate( shift: string ): Promise<boolean> {  
        
        const shifts: Array<string> = [ '1st', '2dn', '3rd' ];

        const _incl = shifts.includes( shift );

        if ( !_incl )  {

            return false;

        };

        return true;

  };

  defaultMessage( args: ValidationArguments ): string {

    return `shift must be [ '1st', '2dn', '3rd' ]`;

  };

}

