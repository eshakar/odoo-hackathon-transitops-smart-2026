import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('TransitOps Smart API')
    .setDescription('The API description for the TransitOps Hackathon Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
