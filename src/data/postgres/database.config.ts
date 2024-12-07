import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from './connection.interface';
import { SequelizeOptions } from 'sequelize-typescript';

export class DataBasePostgresTascomConfig implements IDatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  rc: SequelizeOptions;
  production: SequelizeOptions;

  constructor(private configService: ConfigService) {
    this.development = {
      username: this.configService.get<string>('PG_DEV_USER'),
      password: this.configService.get<string>('PG_DEV_PASS'),
      database: this.configService.get<string>('PG_DEV_NAME'),
      host: this.configService.get<string>('PG_DEV_HOST'),
      port: this.configService.get<number>('PG_DEV_PORT'),
    };

    this.test = {
      username: this.configService.get<string>('PG_TEST_USER'),
      password: this.configService.get<string>('PG_TEST_PASS'),
      database: this.configService.get<string>('PG_TEST_NAME'),
      host: this.configService.get<string>('PG_TEST_HOST'),
      port: this.configService.get<number>('PG_TEST_PORT'),
    };

    this.rc = {
      username: this.configService.get<string>('PG_RC_USER'),
      password: this.configService.get<string>('PG_RC_PASS'),
      database: this.configService.get<string>('PG_RC_NAME'),
      host: this.configService.get<string>('PG_RC_HOST'),
      port: this.configService.get<number>('PG_RC_PORT'),
    };

    this.production = {
      username: this.configService.get<string>('PG_PRD_USER'),
      password: this.configService.get<string>('PG_PRD_PASS'),
      database: this.configService.get<string>('PG_PRD_NAME'),
      host: this.configService.get<string>('PG_PRD_HOST'),
      port: this.configService.get<number>('PG_PRD_PORT'),
    };
  }
}
