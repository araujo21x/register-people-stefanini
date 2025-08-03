import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { NestApplicationOptions } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const options: NestApplicationOptions = { cors: { origin: '*' } };
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API de cadastro de pessoas')
    .setDescription('API para cadastro de pessoas')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:9000', 'local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document);

  app.use(compression());
  app.useGlobalFilters();
  app.use(helmet());

  await app.listen(process.env.PORT ?? 9000);
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar a aplicação:', error);
  process.exit(1);
});
