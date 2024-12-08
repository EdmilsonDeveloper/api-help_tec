import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { setEnvironmentPrefix } from './shared/utils/setEnvironmentPrefix';
import { ConfigService } from '@nestjs/config';
import { swaggerStart } from './documentation/swagger.doc';

async function bootstrap(configService: ConfigService) {
  const app = await NestFactory.create(AppModule);
  const prefix = setEnvironmentPrefix(configService.get<string>('NODE_ENV'));

  swaggerStart(app);
  app.setGlobalPrefix(`${prefix}/api`, {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.enableCors();

  await app.listen(configService.get<number>('NODE_PORT') || 3000, () => {
    console.log(
      `Application Running on port ${configService.get<number>('NODE_PORT') || 3000} ✅`,
    );
  });
}
bootstrap(new ConfigService());
