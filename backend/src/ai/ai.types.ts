export interface AiQueryRequest {
  prompt: string;
  scenario?: number;
}

export interface StreamChunk {
  requestId: string;
  sequence: number;
  content: string;
}

export interface StreamComplete {
  requestId: string;
  totalChunks: number;
}