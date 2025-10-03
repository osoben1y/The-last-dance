import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors();

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('THE LAST DANCE')
    .setDescription('Final Project "Airways system management" => created by Asadbek Mamajonov. The project have been given. by Azim Umarov(Main teacher)')
    .setVersion('5.7')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000, () => {
    const port = process.env.PORT ?? 3000;
    console.log(
      `SWAGGER => http://localhost:${port}/api-docs`,
    );
  });
}
bootstrap();
