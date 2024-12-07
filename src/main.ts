import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { setEnvironmentPrefix } from './shared/utils/setEnvironmentPrefix';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = setEnvironmentPrefix(process.env.NODE_ENV);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix(`${prefix}/api`, {
    exclude: [{ path: '/', method: RequestMethod.GET}],
  });
  await app.listen(process.env.NODE_PORT ?? 3000);
}
bootstrap();
