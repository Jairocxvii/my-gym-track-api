import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no declaradas
      forbidNonWhitelisted: true, // lanza error si hay extras
      transform: true, // ← convierte automáticamente
      transformOptions: {
        enableImplicitConversion: true, // ← "2" → 2, "true" → true
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
