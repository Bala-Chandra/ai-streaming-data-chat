import { io, type Socket } from 'socket.io-client';

import type {
  AiChunkEvent,
  AiCompleteEvent,
  AiStartedEvent,
} from '@/types/ai-chat';

interface AiSocketHandlers {
  onStarted: (event: AiStartedEvent) => void;
  onChunk: (event: AiChunkEvent) => void;
  onComplete: (event: AiCompleteEvent) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

class AiSocketService {
  private socket: Socket | null = null;

  connect(handlers: AiSocketHandlers): void {
    if (this.socket) {
      return;
    }

    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      handlers.onConnect();
    });

    this.socket.on('disconnect', () => {
      handlers.onDisconnect();
    });

    this.socket.on('ai:started', (event: AiStartedEvent) => {
      handlers.onStarted(event);
    });

    this.socket.on('ai:chunk', (event: AiChunkEvent) => {
      handlers.onChunk(event);
    });

    this.socket.on('ai:complete', (event: AiCompleteEvent) => {
      handlers.onComplete(event);
    });
  }

  sendQuery(prompt: string, scenario: number): void {
    if (!this.socket?.connected) {
      throw new Error('WebSocket is not connected');
    }

    this.socket.emit('ai:query', {
      prompt,
      scenario,
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const aiSocketService = new AiSocketService();
