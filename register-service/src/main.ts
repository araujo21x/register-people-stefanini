import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { NestApplicationOptions, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const options: NestApplicationOptions = { cors: { origin: '*' } };
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api');

  app.enableVersioning({ type: VersioningType.URI });
  const config = new DocumentBuilder()
    .setTitle('API de cadastro de pessoas')
    .setDescription('API para cadastro de pessoas')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:9000', 'local')
    .addServer('https://register-people-stefanini.onrender.com', 'homolog')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  app.use(compression());
  app.useGlobalFilters();
  app.use(helmet());

  await app.listen(process.env.PORT ?? 9000);
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar a aplicação:', error);
  process.exit(1);
});
