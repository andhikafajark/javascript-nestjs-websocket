import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client,
  ): void {
    this.server.emit('message', message);
  }
}
