import { Controller } from "@nestjs/common";

//* Microservice //
import { MessagePattern, Payload } from "@nestjs/microservices";

//* logger //
import { LoggerService } from "../../../logger/logger.service";

//* Service //
import { MainUUTService } from "../service";

//* DTO //
import { UutLogsDTO } from "../dto";

//* Interface //
import { UutLogInterface } from '../interface';

@Controller( 'microservice/v1/v1/testLogs/main_uut' )
export class UutLogsMicroservice {

    constructor( 

        private readonly _MainUUTService: MainUUTService,  
        private readonly loggerService: LoggerService

    ) { }

    @MessagePattern( 'UUT' )
    public async _postUutLog( @Payload( ) payload : UutLogsDTO ): Promise<UutLogInterface> {

        this.loggerService.log( JSON.stringify( { type: 'MICROSERVICE', ingoing: UutLogsDTO, user:'pending', api:'/api/v1/testLogs/main_uut' } ) );
        const response = await this._MainUUTService._postUutLog( payload );
        this.loggerService.log( JSON.stringify( { type: 'MICROSERVICE', outgoing: response, user:'pending', api:'/api/v1/testLogs/main_uut' } ) );
        return response;

    };

}