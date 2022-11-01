import { Body, Controller, Get, Post } from "@nestjs/common";

//* swagger Doc //
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseDecorator } from "src/common/decorator";

//* Logger //
import { LoggerService } from '../../../logger/logger.service';

//* DTO //
import { FailsDTO } from "../dto";

//* Interface //
import { FailsInterface } from "../interface";

//* Providers //
import { FailsService } from "../service";

//! Esto solo es temporal 

@Controller('api/v1/testLogs/fails')
@ApiTags('FAILS')

export class FailsController {

    constructor(

        private readonly loggerService: LoggerService,
        private readonly failsService: FailsService

    ) { }

    //? SET Quick TestLog
    @ApiOperation({
        description: 'POST Fail',
    })
    @ApiBody({
        description: 'Temporal api to POST fails',
        type: FailsDTO,
        examples: {
          ejemplo1: {
            value: {
            
                strSSN: 'strSSN Example',
                strTestlog: 'strTestlog Example', 
                strFolder: 'strFolder Example',
                strFailDescription: 'strFailDescription Example',
                strErrorCode: 'strErrorCode Example',
                strSerialChassis: 'strSerialChassis'                

            }
          }
        }
      })
    @ResponseDecorator( )
    @Post( )
      public async _postFail( @Body( ) { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis }: FailsDTO ): Promise<FailsInterface> {

        this.loggerService.log( JSON.stringify( { type: 'POST', ingoing: { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis }, user:'pending', api:'api/v1/testLogs/fails' } ) );
        const response = await this.failsService._postFail( { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis } );
        this.loggerService.log( JSON.stringify( { type: 'POST', outgoing: response, user:'pending', api:'api/v1/testLogs/fails' } ) );
        return response;

      }; 

    //? GET all fails report xls
    @ApiOperation( {
        description: 'GET ALL fails report'
      })
    @ResponseDecorator( )
    @Get( '/report' )
      public async _getReport(  ): Promise<Array<any>> {
  
          this.loggerService.log( JSON.stringify( { type: 'GET', ingoing: 'n/a', user:'pending', api:'api/v1/testLogs/report' } ) );
          const response = await this.failsService._getReport( );
          this.loggerService.log( JSON.stringify( { type: 'GET', outgoing: response, user:'pending', api:'api/v1/testLogs/report' } ) );
          return response;
  
      };

    @ResponseDecorator( )
    @Get( '/' )
      public async _getFails( /*@GetUserFromRequest( ) user: any,*/ ): Promise<FailsInterface[]> {
  
          this.loggerService.log( JSON.stringify( { type: 'GET', ingoing: 'n/a', user:'pending', api:'api/v1/testLogs/fails' } ) );
          const response = await this.failsService._getFails( );
          this.loggerService.log( JSON.stringify( { type: 'GET', outgoing: response, user:'pending', api:'api/v1/testLogs/fails' } ) );
          return response;
  
      };

}