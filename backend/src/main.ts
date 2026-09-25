import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:9000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log('NestJS backend running on http://localhost:3000');
}

void bootstrap();