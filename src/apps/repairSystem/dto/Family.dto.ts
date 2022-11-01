
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";

//! Decorator //
import { GetFamilyDesc } from '../decorator';

export class FamilyDTO {

    //! Description //
    @Validate( GetFamilyDesc )
    @ApiProperty( {

        name:'desc',
        type: 'string',
        description: 'Family Description',
        example: 'Azure 4.1'

    } )
    @IsNotEmpty( )
    @IsString( )
    desc: string;

     //! nodeQty //
     @ApiProperty( {

        name:'desc',
        type: 'string',
        description: 'NodeQty',
        example: 16

    } )
    @IsNotEmpty( )
    @IsNumber( )
    nodeQty: string;

};