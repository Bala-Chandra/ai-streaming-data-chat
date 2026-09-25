import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AiStreamService } from './ai-stream.service.js';
import type {
  AiQueryRequest,
  StreamChunk,
  StreamComplete,
} from './ai.types.ts';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AiGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly aiStreamService: AiStreamService) {}

  @SubscribeMessage('ai:query')
  async handleQuery(
    @ConnectedSocket() client: Socket,
    @MessageBody() request: AiQueryRequest,
  ): Promise<void> {
    const requestId = crypto.randomUUID();

    const content = this.aiStreamService.getResponse(
      request.scenario ?? 1,
    );

    const chunks = this.aiStreamService.createChunks(content);

    client.emit('ai:started', {
      requestId,
      prompt: request.prompt,
    });

    for (let sequence = 0; sequence < chunks.length; sequence++) {
      await this.delay(this.aiStreamService.getChunkDelay());

      const event: StreamChunk = {
        requestId,
        sequence,
        content: chunks[sequence] ?? '',
      };

      client.emit('ai:chunk', event);
    }

    const completeEvent: StreamComplete = {
      requestId,
      totalChunks: chunks.length,
    };

    client.emit('ai:complete', completeEvent);
  }

  handleConnection(client: Socket): void {
    console.log(`WebSocket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`WebSocket disconnected: ${client.id}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}