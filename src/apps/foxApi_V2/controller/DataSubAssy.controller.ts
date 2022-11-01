
import { Body, Controller, Get, Post, Query } from "@nestjs/common";

//* Doc //
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

// //* dto //
import { SendAttributeDataSubAssyDTO } from "../dto";

// //* Interface //
// import { sendAttributeDataSubAssyObjInterface } from "../interface";

// //* Service //
import { DataSubAssyService } from "../service";

//* Decorator //
import { ResponseDecorator } from '../../../common/decorator/response.decorator';

@Controller( 'api/v2/sendAttributeDataSubAssy' )
@ApiTags( 'sendAttributeDataSubAssy' )
export class DataSubAssyController {

    constructor(

        private readonly dataSubAssyService: DataSubAssyService

     ) {}
    
    @ResponseDecorator( )
    @ApiOperation( {
        description: 'SendAttributeDataSubAssy',
        summary:  'CyGNUS'
    } )
    @ApiBody( {
        description: 'Data example',
        type: SendAttributeDataSubAssyDTO,
        examples: {
            ejemplo1: {
                value: {
                    sendAttributeDataSubAssy: [
                        {   
                            TESTLOG: 'test.log',
                            SERIALNO: 'HPM2M005EVC1',
                            ASSET_TAG: 'test',
                            bios_ver : 'test',
                            cpld_fw : '2016-04-30 03:38:56',
                            uuid : 'test',
                            eccek : 'test',
                            'm.2_model': 'test',
                            'm.2_fw': 'test',
                            nic1_fw: 'test',
                            nic1_mac_port1: 'test',
                            nic2_fw: 'test',
                            nic2_mac_port1: 'test',
                            bmc_fw: 'test',
                            bmc_mac_shared: 'test',
                            bmc_mac_dedicated: 'test',
                            tpm_fw: 'test',
                        }
                    ]
                }
            }
        }
    } )
    @ResponseDecorator( )
    @Post( )
    public async create( 
        @Body( ) sendAttributeDataSubAssyDTO: SendAttributeDataSubAssyDTO ): Promise<any> {

        return this.dataSubAssyService.create( sendAttributeDataSubAssyDTO );

    }; 

}