import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { RateLimitFilter } from './common/filters/rate-limit.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new NotFoundFilter(), new RateLimitFilter());

  const config = new DocumentBuilder()
    .setDescription(process.env.SWAGGER_API_DESCRIPTION ?? 'SWAGGER_API_DESCRIPTION')
    .setVersion(process.env.SWAGGER_API_VERSION ?? 'SWAGGER_API_VERSION')
    .setTitle(process.env.SWAGGER_API_TITLE ?? 'SWAGGER_API_TITLE')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 ${process.env.APP_NAME}'S RUNNING ON PORT ${process.env.PORT ?? 3000}`);
}

bootstrap();
