import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { GetErrorCode } from "../decorator";

export class ErrorCodeDTO {

    //! code //
    @Validate( GetErrorCode )
    @ApiProperty( {

        name:'code',
        type: 'number',
        description: 'Error Code',
        example: '7894'

    } )
    @IsNotEmpty( )
    @IsNumber( )
    code: string;

    //! description //
    @ApiProperty( {

        name:'description',
        type: 'string',
        description: 'Error Code Description',
        example: '7894'

    } )
    @IsNotEmpty( )
    @IsString( )
    description: string;

};