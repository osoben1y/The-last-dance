import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Enable CORS
  app.enableCors();

  // Global API prefix
  app.setGlobalPrefix('api');

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Airways System API')
    .setDescription('Comprehensive API for flight booking, user management, and airline operations')
    .setVersion('1.0')
    .addTag('Airways')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000, () => {
    const port = process.env.PORT ?? 3000;
    console.log(
      `Server is running on http://localhost:${port}/api`,
    );
    console.log(
      `API Documentation available at http://localhost:${port}/api-docs`,
    );
  });
}
bootstrap();
