/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString, Validate, ValidateNested } from "class-validator";
import { ValidTest } from "../decorator";
import { MacAddressDTO } from "./";

export class UutLogsDTO {

    //! strTestLog //
    @ApiProperty( {
        name:'strTestLog',
        type: 'string',
        description: 'strTestLog',
        example: 'example strTestLog'
    } )
    @IsNotEmpty( )
    @IsString( )
    strTestLog: string

    //! strStatus //
    @ApiProperty( {
        name:'strStatus',
        type: 'string',
        description: 'strStatus',
        example: 'example strStatus'
    } )
    @IsNotEmpty( )
    @IsString( )
    strStatus: string

     //! strSerialMainBoard //
     @ApiProperty( {
        name:'strSerialMainBoard',
        type: 'string',
        description: 'strSerialMainBoard',
        example: 'example strSerialMainBoard'
    } )
    @IsNotEmpty( )
    @IsString( )
    strSerialMainBoard: string

    //! strAssetTagNode //
    @ApiProperty( {
        name:'strAssetTagNode',
        type: 'string',
        description: 'strAssetTagNode',
        example: 'example strAssetTagNode'
    } )
    @IsNotEmpty( )
    @IsString( )
    strAssetTagNode: string

    //! strSerialChassis //
    @ApiProperty( {
        name:'strSerialChassis',
        type: 'string',
        description: 'strSerialChassis',
        example: 'example strSerialChassis'
    } )
    @IsNotEmpty( )
    @IsString( )
    strSerialChassis: string

    //! strPxebootServer //
    @ApiProperty( {
        name:'strPxebootServer',
        type: 'string',
        description: 'strPxebootServer',
        example: 'example strPxebootServer'
    } )
    @IsNotEmpty( )
    @IsString( )
    strPxebootServer: string

    //! strPartNumber //
    @ApiProperty( {
        name:'strPartNumber',
        type: 'string',
        description: 'strPartNumber',
        example: 'example strPartNumber'
    } )
    @IsNotEmpty( )
    @IsString( )
    strPartNumber: string

    //! strProductVersion //
    @ApiProperty( {
        name:'strProductVersion',
        type: 'string',
        description: 'strProductVersion',
        example: 'example strProductVersion'
    } )
    @IsNotEmpty( )
    @IsString( )
    strProductVersion: string

    //! strBoardProduct //
    @ApiProperty( {
        name:'strBoardProduct',
        type: 'string',
        description: 'strBoardProduct',
        example: 'example strBoardProduct'
    } )
    @IsNotEmpty( )
    @IsString( )
    strBoardProduct: string

    //! strSKU //
    @ApiProperty( {
        name:'strSKU',
        type: 'string',
        description: 'strSKU',
        example: 'example strSKU'
    } )
    @IsNotEmpty( )
    @IsString( )
    strSKU: string

    //! strFolder //
    @Validate( ValidTest )
    @ApiProperty( {
        name:'strFolder',
        type: 'string',
        description: 'strFolder',
        example: 'example strFolder'
    } )
    @IsNotEmpty( )
    @IsString( )
    strFolder: string

    //! strSerialNode //
    @ApiProperty( {
        name:'strSerialNode',
        type: 'string',
        description: 'strSerialNode',
        example: 'example strSerialNode'
    } )
    @IsNotEmpty( )
    @IsString( )
    strSerialNode: string

    //! dtStartTime //
    @ApiProperty( {
        name:'dtStartTime',
        type: 'string',
        description: 'dtStartTime',
        example: 'example dtStartTime'
    } )
    @IsNotEmpty( )
    @IsDateString()
    dtStartTime: Date

     //! dtEndTime //
     @ApiProperty( {
        name:'dtEndTime',
        type: 'string',
        description: 'dtEndTime',
        example: 'example dtEndTime'
    } )
    @IsNotEmpty( )
    @IsDateString()
    dtEndTime: Date

    //! strPath //
    @ApiProperty( {
        name:'strPath',
        type: 'string',
        description: 'strPath',
        example: 'example strPath'
    } )
    @IsNotEmpty( )
    @IsString()
    strPath: string

    //! strFailDescription //
    @ApiProperty( {
        name:'strFailDescription',
        type: 'string',
        description: 'strFailDescription',
        example: 'example strFailDescription'
    } )
    @IsNotEmpty( )
    @IsString()
    strFailDescription: string

    //! strErrorCode //
    @ApiProperty( {
        name:'strErrorCode',
        type: 'string',
        description: 'strErrorCode',
        example: 'example strErrorCode'
    } )
    @IsNotEmpty( )
    @IsString()
    strErrorCode: string

    //! _macAddress //
    @ApiProperty( {
        name:'_macAddress_',
        type: 'json',
        description: '_macAddress_',
        example: "[ { macAddress: '3D:F2:C9:A6:B3:4F' } ]"

    } )
    @IsNotEmpty( )
    @IsArray()
    @ValidateNested( { each: true } )
    @ArrayMinSize( 1 )
    @Type( ( ) => MacAddressDTO )
    _macAddress_: MacAddressDTO[ ]


};