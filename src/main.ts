import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DbExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new DbExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // <-- AÑADE ESTA LÍNEA
      transformOptions: {
        enableImplicitConversion: true, // <-- Permite convertir tipos implícitamente (ej: "123" -> 123)
      },
    }),
  );

  // Para cambiar nombre o de tag personalizada
  // @ApiTags('nombre-etiqueta')

  const config = new DocumentBuilder()
    .setTitle('Teslo RESTFul API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    // Organizar la documentación de forma alfabetica
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'aplha',
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
