"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map