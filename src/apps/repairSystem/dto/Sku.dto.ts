import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { GetSku } from "../decorator";

export class SkuDTO {

    @Validate( GetSku )
    @ApiProperty( {

        name:'sku',
        type: 'string',
        description: 'sku',
        example: 'M1141972-001'

    } )
    @IsNotEmpty( )
    @IsString( )
    sku: string;

};