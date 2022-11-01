import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { LoggerService } from '../logger/logger.service';
import { server_ip } from '../apps/shared/global/server_ip';

@Injectable() 
export class MicroserviceConnectionService {

    //! Add clients as much as needed //
    private user_microservice: ClientProxy;

     constructor ( 
         private readonly loggerService: LoggerService, 
         private readonly configService: ConfigService
    ) {

        //! GET port from  configService//
        this.connect_microservice( server_ip, 'user_microservice', this.configService.get( 'mongo.userMicroservice' ) );

    }

    private async connect_microservice ( host: string, client: string, port: number  ) {
        
        //! Create conexion //
        this[ client ] = ClientProxyFactory.create( {

            transport: Transport.TCP,
            options: { 
                host, 
                port
            }

        } );

        //! Try to connect //
        try {

            await this[ client ].connect( );
            this.loggerService.log( JSON.stringify( { method: 'TCP', payload:`Connected to ${ client } on port ${ port }` } ) );

        } catch ( error ) {

            this.loggerService.error( JSON.stringify( { method: 'TCP', payload:`${ error } ${ client }` } ) );
            
        };

   };

   // Get a microservice conection 
   public getClient( client: string ): ClientProxy {

        return this[ client ];

   };
  
}
