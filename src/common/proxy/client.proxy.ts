import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable( )
export class ClientProxyMain {

    constructor(  private readonly configService: ConfigService ) { }

    ClientProxyConnMSFT ( ): ClientProxy {

        return ClientProxyFactory.create( {

            transport: Transport.RMQ,
            options: {
                
                urls: [ 'amqps://aplkysun:vT7RBW9Fl-7OzDmeAb0mk7mW-Ukz80Kb@hawk.rmq.cloudamqp.com/aplkysun' ],
                queue: this.configService.get( 'mongo.database' )

            }

        } );

    }

}