import { Module } from '@nestjs/common';

import { AiGateway } from './ai.gateway.js';
import { AiStreamService } from './ai-stream.service.js';

@Module({
  providers: [
    AiGateway,
    AiStreamService,
  ],
})
export class AiModule {}