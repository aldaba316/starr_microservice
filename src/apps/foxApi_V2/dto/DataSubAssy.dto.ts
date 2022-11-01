import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class SendAttributeDataSubAssyObj {

    //! TESTLOG //
    @ApiProperty( {

        name:'TESTLOG',
        type: 'string',
        description: 'TestLog',
        example: 'test.log'

    } )
    @IsNotEmpty( )
    @IsString( )
    TESTLOG: string

     //! SERIALNO //
    @ApiProperty( {

        name:'SERIALNO',
        type: 'string',
        description: 'Serial Number',
        example: 'HPM2M005EVC1'

    } )
    @IsNotEmpty( )
    @IsString( )
    SERIALNO: string

    //! ASSET_TAG //
    @ApiProperty( {

        name:'ASSET_TAG',
        type: 'string',
        description: 'AssetTag',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    ASSET_TAG: string

    //! bios_ver //
    @ApiProperty( {

        name:'bios_ver',
        type: 'string',
        description: 'BIOS version',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    bios_ver: string

    //! cpld_fw //
    @ApiProperty( {

        name:'cpld_fw',
        type: 'string',
        description: 'CPLD Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    cpld_fw: string

    //! uuid //
    @ApiProperty( {

        name:'uuid',
        type: 'string',
        description: 'UUID',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    uuid: string

    //! eccek //
    @ApiProperty( {

        name:'eccek',
        type: 'string',
        description: 'ECCEK',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    eccek: string

    //! m.2_model //
    @ApiProperty( {

        name:'m.2_model',
        type: 'string',
        description: 'M2 Model',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    'm.2_model': string

     //! m.2_fw //
     @ApiProperty( {

        name:'m.2_fw',
        type: 'string',
        description: 'M2 Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    'm.2_fw': string

    //! nic1_fw //
    @ApiProperty( {

        name:'nic1_fw',
        type: 'string',
        description: 'NIC 1 Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    nic1_fw: string

     //! nic1_mac_port1 //
     @ApiProperty( {

        name:'nic1_mac_port1',
        type: 'string',
        description: 'NIC 1 MAC PORT 1',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    nic1_mac_port1: string

     //! nic2_fw //
     @ApiProperty( {

        name:'nic2_fw',
        type: 'string',
        description: 'NIC 2 Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    nic2_fw: string

     //! nic2_mac_port1 //
     @ApiProperty( {

        name:'nic2_mac_port1',
        type: 'string',
        description: 'NIC 2 MAC PORT 1',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    nic2_mac_port1: string

     //! bmc_fw //
     @ApiProperty( {

        name:'bmc_fw',
        type: 'string',
        description: 'BMC Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    bmc_fw: string

    //! bmc_mac_shared //
    @ApiProperty( {

        name:'bmc_mac_shared',
        type: 'string',
        description: 'BMC MC Shared',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    bmc_mac_shared: string

    //! bmc_mac_dedicated //
    @ApiProperty( {

        name:'bmc_mac_dedicated',
        type: 'string',
        description: 'BMC MC Dedicated',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    bmc_mac_dedicated: string

    //! tpm_fw //
    @ApiProperty( {

        name:'tpm_fw',
        type: 'string',
        description: 'TPM Firmware',
        example: 'example'

    } )
    @IsNotEmpty( )
    @IsString( )
    tpm_fw: string

     // .l. //
    //  @ApiProperty( {

    //     name:'warranty_yrs_mb',
    //     type: 'string',
    //     description: 'warranty years mainboard',
    //     example: 'example'

    // } )
    // @IsNotEmpty( )
    // @IsString( )
    // warranty_yrs_mb: string

    
     // .l. //
    //  @ApiProperty( {

    //     name:'warranty_yrs_bmc',
    //     type: 'string',
    //     description: 'warranty years bmc',
    //     example: 'example'

    // } )
    // @IsNotEmpty( )
    // @IsString( )
    // warranty_yrs_bmc: string

};

export class SendAttributeDataSubAssyDTO {

    @ApiProperty( {

        name:'sendAttributeDataSubAssy',
        type: 'JSON',
        description: 'Main object',
        example: "[ {'serialno': 'HPM2M005EVC1', 'asset_tag': 'test', 'bios_ver ': 'test', 'cpld_fw ': '2016-04-30 03:38:56', 'uuid ': 'test', 'eccek ': 'test', 'm.2_model': 'test', 'm.2_fw': 'test', 'nic1_fw': 'test', 'nic1_mac_port1': 'test','nic2_fw': 'test', 'nic2_mac_port1': 'test', 'bmc_fw': 'test', 'bmc_mac_shared': 'test', 'bmc_mac_dedicated': 'test', 'tpm_fw': 'test'} ]"

    } )
    @IsNotEmpty( )
    @IsArray()
    @ValidateNested( { each: true } )
    @ArrayMinSize( 1 )
    @Type( ( ) => SendAttributeDataSubAssyObj )
    sendAttributeDataSubAssy: SendAttributeDataSubAssyObj[ ]

};



