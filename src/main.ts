import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * straps the nest js application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })
  );
  await app.listen(3000);
}
bootstrap();
