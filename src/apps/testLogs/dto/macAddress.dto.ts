 /* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

import { IsMACAddress, IsNotEmpty } from "class-validator";

export class MacAddressDTO {

    @ApiProperty( {
        name:'macAddress',
        type: 'string',
        description: 'macAddress',
        example: '3D:F2:C9:A6:B3:4F'

    } )
    @IsNotEmpty( )
    @IsMACAddress( )
    macAddress: string

};
