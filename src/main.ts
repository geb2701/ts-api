import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import pkg from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Generar el documento OpenAPI (lo sigue haciendo @nestjs/swagger)
  const config = new DocumentBuilder()
    .setTitle('API Padel')
    .setDescription('NestJS + Prisma con Scalar UI')
    .setVersion(pkg.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const adapter = app.getHttpAdapter();
  adapter.get('/openapi.json', (req, res) => res.json(document));

  // 👉 Usar SOLO Scalar en /docs
  app.use('/docs', apiReference({ content: document, theme: 'purple' }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Docs (Scalar): http://localhost:${process.env.PORT ?? 3000}/docs`);
}
bootstrap();
