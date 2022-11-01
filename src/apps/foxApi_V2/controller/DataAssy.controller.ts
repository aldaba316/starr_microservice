
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

//* Doc //
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

//* Decorator //
import { ResponseDecorator } from '../../../common/decorator/response.decorator';

//* Service //
import { DataAssyService } from '../service';

//* DTO //
import * as D from '../dto';

@Controller( 'api/v2/sendAttributeDataAssy' )
@ApiTags( 'sendAttributeDataAssy' )
export class DataAssyController {

    constructor(

        private readonly dataAssyService: DataAssyService

    ) { }

    @ResponseDecorator( )
    @ApiOperation( {
        description: 'SendAttributeDataAssy',
        summary:  'CyGNUS'
    } ) 
    @ApiBody( {

        description: 'Data example',
        type: D.SendAttributeDataAssyDTO,
        examples: {
            ejemplo1: {
                value: {
                    sendAttributeDataAssy: {
                        TESTLOG: 'testv2.log',
                        SERIALNO:'2M22KLS',
                        ASSET_TAG:'2M22KLS',
                        PSU1_REV:'2M22KLS',
                        PSU1_FW:'2M22KLS',
                        PSU2_REV:'2M22KLS',
                        PSU2_FW:'2M22KLS'
                    }
                }
            }
        }
    } )
    @Post( )
    public async create( 
        @Body( ) SendAttributeDataAssyDTO: D.SendAttributeDataAssyDTO ): Promise<any> {

        return this.dataAssyService.create( SendAttributeDataAssyDTO );

    };

    // @ResponseDecorator( )
    // @ApiOperation( {
    //     description: 'GET All report History'
    // })
    // @ApiQuery( {
    //     name:'from',
    //     type: Number,
    //     description: 'From which position',
    //     required: false
    // } )
    // @ApiQuery( {
    //     name:'limit',
    //     type: Number,
    //     description: 'How many data',
    //     required: false
    // } )
    // @Get( '/reports' )
    // public async reports( 
    //     @Query( 'from' ) from: number, 
    //     @Query( 'limit' ) limit: number ): Promise<sendAttributeDataAssyObjInterface[ ]> {

    //     return await this.sendAttributeDataAssyService._reports( from , limit );

    // };

    // @ResponseDecorator( )
    // @ApiOperation( {
    //     description: 'GET Report History by serialNumber'
    // })
    // @ApiQuery( {
    //     name:'serialNumber',
    //     type: String,
    //     required: true,
    //     description: 'Serial Number'
    // } )
    // @Get( '/report' )
    // public async OneSSN( @Query( 'serialNumber' ) serialNumber ): Promise<sendAttributeDataAssyObjInterface> {

    //     return await this.sendAttributeDataAssyService._report( serialNumber );

    // };

}