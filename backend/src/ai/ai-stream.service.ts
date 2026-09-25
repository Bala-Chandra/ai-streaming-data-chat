import { Injectable } from '@nestjs/common';
import { MOCK_RESPONSES } from './mock-responses.js';

@Injectable()
export class AiStreamService {
  getResponse(scenario = 1): string {
    const response =
      MOCK_RESPONSES.find((item) => item.id === scenario) ??
      MOCK_RESPONSES[0];

    if (!response) {
      throw new Error('No mock AI responses configured');
    }

    return response.content;
  }

  createChunks(content: string): string[] {
    const chunks: string[] = [];

    let cursor = 0;

    while (cursor < content.length) {
      // Intentionally variable chunk sizes.
      // This means JSON, Markdown and tables can be split
      // at inconvenient locations.
      const chunkSize = Math.floor(Math.random() * 70) + 20;

      chunks.push(content.slice(cursor, cursor + chunkSize));

      cursor += chunkSize;
    }

    return chunks;
  }

  getChunkDelay(): number {
    // 100–500ms initially.
    // Later scenarios will deliberately become much slower.
    return Math.floor(Math.random() * 400) + 100;
  }
}