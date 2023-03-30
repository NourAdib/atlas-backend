import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * Create the NestJS application
   */
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  /**
   * Enable CORS
   * @description This is required for the web interface to work
   * @see https://docs.nestjs.com/techniques/cors
   */
  app.enableCors();

  /**
   * Enable global validation
   * @description This is required for the dto validation to work
   * @see https://docs.nestjs.com/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })
  );

  /**
   * Start the application
   */
  await app.listen(3000);
}
bootstrap();
