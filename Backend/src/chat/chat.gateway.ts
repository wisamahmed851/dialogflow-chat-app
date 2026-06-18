import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'

import { Server, Socket } from 'socket.io'
import { ChatService } from './services/chat.service'
import { DialogflowService } from './services/dialogflow.service'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor (
    private readonly chatService: ChatService,
    private readonly dialogflowService: DialogflowService,
  ) {}
  handleConnection (client: Socket) {
    console.log(`Connected: ${client.id}`)
  }

  handleDisconnect (client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }

  @SubscribeMessage('sendMessage')
  async handleMessage (
    @MessageBody() payload: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(payload)
    const response = await this.dialogflowService.detectIntent(
      client.id,
      payload.message,
    )

    console.log(response)

    client.emit('reciveMessage', {
      message: response.queryResult?.fulfillmentText,
      intent: response.queryResult?.intent?.displayName,
      timestamp: new Date().toISOString(),
    })
  }
}
