import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create( //NestFastifyApplication
    AppModule,
    // new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const logger = new Logger('Bootstrap');
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('School Management System')
    .setDescription('SMS API')
    .setVersion('1.0')
    .addTag('/api') // You can add tags to group endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
