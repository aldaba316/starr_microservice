import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, Validate, ValidateNested } from 'class-validator';
import { ValidatorVersion } from '../decorator';

export class ssnDTO {

    //! SSN //
    @ApiProperty( {
        name:'SSN',
        type: 'string',
        description: 'Serial Number',
        example: 'strSerialNode example'
    
    } )
    @IsNotEmpty( )
    @IsString( )
    SSN: string;

};

export class array_ssnDTO {

    //! arraySSN //
    @ApiProperty( {
        name:'arraySSN',
        type: 'Array',
        description: 'Array Serial Number',
        example: "[ { 'SSN': 'strSerialNode example' } ]"
    
    } )
    @IsArray( )
    @ValidateNested( { each: true } )
    @ArrayMinSize( 1 )
    @Type( ( ) => ssnDTO )
    arraySSN: ssnDTO[ ]

     //! test //
     @Validate( ValidatorVersion )
     @ApiProperty( {
        name:'version',
        type: 'string',
        description: 'Validator Type, it could be QuickTest or Stress-FT',
        example: 'QuickTest'
    
    } )
    @IsNotEmpty( )
    @IsString( )
    version: string;

};