
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class SendAttributeDataAssyObj {

    //! TESTLOG //
    @ApiProperty( {

      name:'TESTLOG',
      type: 'string',
      description: 'Testlog',
      example: 'example.log'

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

  //! PSU1_REV //
  @ApiProperty( {

      name:'PSU1_REV',
      type: 'string',
      description: 'PS1 REV',
      example: 'example'

  } )
  @IsNotEmpty( )
  @IsString( )
  PSU1_REV: string

   //! PSU1_FW //
   @ApiProperty( {

      name:'PSU1_FW',
      type: 'string',
      description: 'PS1 Firmware',
      example: 'example'

  } )
  @IsNotEmpty( )
  @IsString( )
  PSU1_FW: string
  
  //! PSU2_REV //
  @ApiProperty( {

      name:'PSU2_REV',
      type: 'string',
      description: 'PS2 REV',
      example: 'example'

  } )
  @IsNotEmpty( )
  @IsString( )
  PSU2_REV: string

   //! PSU2_FW //
   @ApiProperty( {

      name:'PSU2_FW',
      type: 'string',
      description: 'PS2 Firmware',
      example: 'example'

  } )
  @IsNotEmpty( )
  @IsString( )
  PSU2_FW: string

};

export class SendAttributeDataAssyDTO {

    @ApiProperty( {

        name:'sendAttributeDataAssy',
        type: 'array',
        description: 'Main object',
        example: "{ SERIALNO:'2M22KLS', ASSET_TAG:'2M22KLS', CONFIG_CODE:'2M22KLS', MFG_DATE:'2M22KLS', WARRANTY_YRS:'2M22KLS', PSU1_REV:'2M22KLS', PSU1_FW:'2M22KLS', PSU2_REV:'2M22KLS', PSU2_FW:'2M22KLS'}"

    } )
    @IsNotEmpty( )
    @ValidateNested( { each: true } )
    @Type( ( ) => SendAttributeDataAssyObj )
    sendAttributeDataAssy: SendAttributeDataAssyObj

};