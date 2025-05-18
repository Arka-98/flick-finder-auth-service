import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Flick Finder Auth Service')
    .setDescription('Flick Finder Auth REST API specification')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1', app, document);

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
