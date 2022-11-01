/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

import { IsNotEmpty, IsString } from "class-validator";

export class FailsDTO {
 
    //! strSSN //
    @ApiProperty( {
        name:'strSSN',
        type: 'string',
        description: 'strSSN',
        example: 'MXX2290347'
    } )
    @IsNotEmpty( )
    @IsString( )
    strSSN: string

    //! strTestlog // 
    @ApiProperty( {
        name:'strTestlog',
        type: 'string',
        description: 'strTestlog',
        example: 'MXX2290347'

    } )
    @IsNotEmpty( )
    @IsString( )
    strTestlog: string

    //! strFolder // 
    @ApiProperty( {
        name:'strFolder',
        type: 'string',
        description: 'strFolder',
        example: 'MXX2290347'
    } )
    @IsNotEmpty( )
    @IsString( )
    strFolder: string

     //! strFailDescription // 
     @ApiProperty( {
        name:'strFailDescription',
        type: 'string',
        description: 'strFailDescription',
        example: 'MXX2290347'

    } )
    @IsNotEmpty( )
    @IsString( )
    strFailDescription: string

    //! strErrorCode // 
    @ApiProperty( {
        name:'strErrorCode',
        type: 'string',
        description: 'strErrorCode',
        example: 'MXX2290347'

    } )
    @IsNotEmpty( )
    @IsString( )
    strErrorCode: string

    //! strSerialChassis
    @ApiProperty( {
        name:'strSerialChassis',
        type: 'string',
        description: 'strSerialChassis',
        example: 'MXX2290347'

    } )
    @IsNotEmpty( )
    @IsString( )
    strSerialChassis: string

};