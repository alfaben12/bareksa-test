import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
    Requirements:
    ❏ Candidate shall create a project using NodeJS framework and push it to a github repository
    ❏ Create a REST API with domain driven approach
    ❏ Create a service using any SQL / NoSQL storage with your own data model
    ❏ Create an API functional test (unit test) to ensure the feature is working. Develop the task with the mindset that it must be ready for production
    ❏ List, add, update and remove items (CRUD).

    Case Study:
    ❏ News and Topic management
    ❏ CRUD on News and Tags
    ❏ One news can contains multiple tags e.g. "Safe investment" might contains tags "investment", "mutual fund", etc
    ❏ One topic has multiple news e.g. "investment" topic might contains "how to start investment", "mutual fund is safe investment type", etc
    ❏ Enable filter by news status ("draft", "deleted", "publish")
    ❏ Enable filter news by its topics.
    
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
