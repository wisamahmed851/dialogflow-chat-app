import { Injectable } from '@nestjs/common'
import { SessionsClient } from '@google-cloud/dialogflow'
import * as path from 'path'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DialogflowService {
  private readonly sessionClient: SessionsClient
  private readonly projectId: string

  constructor (private readonly configService: ConfigService) {
    this.projectId =
      this.configService.get<string>('DIALOGFLOW_PROJECT_ID') || ''

    const keyFile = this.configService.get<string>('DIALOGFLOW_KEY_FILE');
    this.sessionClient = new SessionsClient({
      keyFilename: path.resolve(keyFile || ''),
    });
  }

  async detectIntent (sessionId: string, message: string) {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectId,
      sessionId,
    )

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en',
        },
      },
    }

    const [response] = await this.sessionClient.detectIntent(request as any)

    return response
  }
}
