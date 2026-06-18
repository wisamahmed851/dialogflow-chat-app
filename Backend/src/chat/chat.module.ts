import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './services/chat.service'
import { DialogflowService } from './services/dialogflow.service'

@Module({
  providers: [ChatGateway, ChatService, DialogflowService],
})
export class ChatModule {}
