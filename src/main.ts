import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const port = process.env.PORT || 3200;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  app.enableCors();
  app.setGlobalPrefix("/api/v1/");
  app.use(morgan('combined'));
  await app.listen(port, ()=> console.log(`Listening in port ${port}`));
}
bootstrap();
