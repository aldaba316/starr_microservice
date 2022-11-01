/* eslint-disable prettier/prettier */
import { Controller } from "@nestjs/common";

//* Microservice //
import { MessagePattern, Payload } from "@nestjs/microservices";

//* logger //
import { LoggerService } from "../../../logger/logger.service";

//* Provider //
import { FailsService } from "../service";

//* DTO //
import { FailsDTO } from "../dto/";

//* Interface //
import { FailsInterface } from "../interface";

@Controller( 'microservice/v1/testlogs/fails' )
export class FailsMicroservice {

    constructor( 

        private readonly loggerService: LoggerService,
        private readonly failsService: FailsService

    ) { }

    @MessagePattern( 'FAILS' )
    public async _postFail( @Payload( ) { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis } : FailsDTO ): Promise<FailsInterface> {

        this.loggerService.log( JSON.stringify( { type: 'MICROSERVICE', ingoing: { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis }, user:'pending', api:'microservice/v1/testlogs/fails' } ) );
        const response = await this.failsService._postFail( { strSSN, strTestlog, strFolder, strFailDescription, strErrorCode, strSerialChassis } );
        this.loggerService.log( JSON.stringify( { type: 'MICROSERVICE', outgoing: response, user:'pending', api:'microservice/v1/testlogs/fails' } ) );
        return response;

    };

}