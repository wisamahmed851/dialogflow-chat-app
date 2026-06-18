import { Injectable } from '@nestjs/common'
import { DialogflowService } from './dialogflow.service'

@Injectable()
export class ChatService {
  constructor (private readonly dialogflowService: DialogflowService) {}

  async processMessage (message: string) {
    const dialogflowResponse = await this.dialogflowService.detectIntent(
        "awdawdwd",
      message,
    )

    return {
      type: 'bot',
      message: dialogflowResponse,
      timestamp: new Date(),
    }
  }
}
