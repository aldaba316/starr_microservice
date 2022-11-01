import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { GetWorkOrder } from "../decorator";

export class WorkOrderDTO {

    @Validate( GetWorkOrder )
    @ApiProperty( {

        name:'workOrder',
        type: 'string',
        description: 'Work Order',
        example: 1850002915

    } )
    @IsNotEmpty( )
    @IsNumber( )
    workOrder: string;

};