import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })

export class RepairGateway {

  @SubscribeMessage( 'pxeboot' )
  onMessage ( client : Socket, payload: any ) {

    console.log( payload );

    return 'Ya te vi alv';

    //client.emit( 'server', 'Ya te vi perro RepairGateway' )
    //client.broadcast.emit( event, payload );

  };


}