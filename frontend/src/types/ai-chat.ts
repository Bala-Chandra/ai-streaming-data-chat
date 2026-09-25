export interface AiStartedEvent {
  requestId: string;
  prompt: string;
}

export interface AiChunkEvent {
  requestId: string;
  sequence: number;
  content: string;
}

export interface AiCompleteEvent {
  requestId: string;
  totalChunks: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type ConnectionState =
  | 'connected'
  | 'disconnected'
  | 'connecting';
