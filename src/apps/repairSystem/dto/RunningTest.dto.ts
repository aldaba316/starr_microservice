 import { ApiProperty } from "@nestjs/swagger";
import {  IsMongoId, IsNotEmpty, IsString, Validate } from "class-validator";
import { GetRunningTest } from "../decorator";
import { Types } from 'mongoose';

export class RunningTestDTO {

    @Validate( GetRunningTest )
    @ApiProperty( {

        name:'test',
        type: 'string',
        description: 'Test',
        example: 'Quick Test'

    } )
    @IsNotEmpty( )
    @IsString( )
    test: string;

};

export class PatchErrorCodeToRunningTestDTO {
        
    @ApiProperty( {

        name:'errorCodeID ',
        type: 'string',
        description: 'User ID',
        example: '62ed6ecd9a326ac087bbf922'

    } )
    @IsNotEmpty( )
    @IsMongoId( )
    errorCodeID: Types.ObjectId;

};

