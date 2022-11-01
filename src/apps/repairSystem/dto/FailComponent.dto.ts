import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { GetFailComponentName } from "../decorator";

export class FailComponentDTO {

    //! componentName //
    @Validate( GetFailComponentName )
    @ApiProperty( {

        name:'componentName',
        type: 'string',
        description: 'DIMM',
        example: '7894'

    } )
    @IsNotEmpty( )
    @IsString( )
    componentName: string;

};