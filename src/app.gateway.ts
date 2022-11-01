import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

//* Logger //
import { LoggerService } from './logger/logger.service';
import { UserService } from './apps/shared/service/User.service';

@WebSocketGateway({ cors: { origin: '*' } })

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(

    private readonly loggerService: LoggerService,
    private readonly userService: UserService

   ) { }

  @WebSocketServer( ) wss:Server;

  async handleConnection( client: Socket ): Promise<void> {

    const token = client.handshake.query.auth as string;

    if ( !token ) {

      client.disconnect( );
      return;

    };

    const response = await this.userService.validateGatewayUser( token, client.id );

    if ( response[ 'ok' ] ) {

      this.loggerService.log( JSON.stringify( { method: 'SOCKET_TCP', payload: `Connected: ${ response[ 'data' ] } ${ client.id }`, api:'/handleConnection' } ) );
      return;

    };

    this.loggerService.error( JSON.stringify( { method: 'SOCKET_TCP', payload: `Connection refused`, api:'/handleConnection' } ) );
    client.disconnect( );
    return;
    
  };

  async handleDisconnect( client: Socket ): Promise<void> {

    this.loggerService.log( JSON.stringify( { method: 'SOCKET', payload: `Someone Disconnected ${ client.id }`, url:'/handleDisconnect' } ) );

  }; 

  async afterInit( ): Promise<void> {

    this.loggerService.log( JSON.stringify( { method: 'SOCKET', payload: 'SOCKET Started', url:'/afterInit' } ) );

  };

  //! Emit Event to everybody //
  public async emitEvent( event: string, payload: any ): Promise<void> {
    
    this.wss.emit( event, payload );

  };


  //! Emit Event to an ID //
  public async emitEventTo( socketID: string, event: string, payload: any ): Promise<void> {
    
    this.wss.to( socketID ).emit( event, payload );

  };

   //! Emit Event to room //
   public async emitEventRoom( room: string, event: string, payload: any ): Promise<void> {

    // client.join( 'ventas' )
    // this.wss.to( 'ventas' ).emit
    
    this.wss.to( room ).emit( event, payload );

  };

}
