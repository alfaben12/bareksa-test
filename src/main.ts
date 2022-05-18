import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NewsModule } from './news/news.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Bareksa Test')
    .setDescription(`
    ❏ Candidate shall create a project using NodeJS framework and push it to a github repository
    ❏ Create a REST API with domain driven approach
    ❏ Create a service using any SQL / NoSQL storage with your own data model
    ❏ Create an API functional test (unit test) to ensure the feature is working. Develop the task with the mindset that it must be ready for production
    ❏ List, add, update and remove items (CRUD).
    \n
    Build With:
    - Nest.js
    - PostgreSQL
    - Redis
`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
