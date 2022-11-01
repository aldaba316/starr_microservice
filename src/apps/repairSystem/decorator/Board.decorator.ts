import { Injectable } from '@nestjs/common';

import {
    ValidatorConstraint,
    ValidatorConstraintInterface, 
    ValidationArguments,
  } from 'class-validator';

  //* Service //
import { BoardService } from '../service';

import { Types } from 'mongoose';

  
@ValidatorConstraint( { name: 'GetBoardID', async: true } )
@Injectable( )
export class GetBoardID implements ValidatorConstraintInterface {

  constructor( 

    private readonly boardService: BoardService
    
  ) { }

  async validate( _id: Types.ObjectId ): Promise<boolean> { 
    
    try {

      await this.boardService.findOne( _id );      
      
      return true;

    } catch ( error ) {
      
      return false;

    };
    
  };

  defaultMessage( args: ValidationArguments ): string {
    
    return `Board _id ${ args.object['_board'] } not exist`;

  };

}

@ValidatorConstraint( { name: 'GetBoardName', async: true } )
@Injectable( )
export class GetBoardName implements ValidatorConstraintInterface {

  constructor( 

   private readonly boardService: BoardService
    
  ) { }

  async validate( boardName: string ): Promise<boolean> {  
 
    try {

        await this.boardService.findOneByName( boardName );
        return true;

    } catch ( error ){

        return false

    }
    
  };

  defaultMessage( args: ValidationArguments ): string {

    return `boardName ${ args.object[ 'boardName' ] } already exist`;

  };

}

