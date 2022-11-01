/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { validTest } from '../../shared/global/validTest';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  
@ValidatorConstraint( { name: 'ValidTest', async: true } )
@Injectable( )
export class ValidTest implements ValidatorConstraintInterface {

  constructor( ) { }

  async validate( test: string ): Promise<boolean> {  

    const containtsTest = validTest.includes( test );

    if ( !containtsTest )
          return false;

     return true;

  };

  defaultMessage( args: ValidationArguments ): string {

    const currentTest = args.object[ 'strFolder' ];

    return `Invalid test ${ currentTest }`;

  };

}

