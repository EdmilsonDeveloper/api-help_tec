import { SequelizeOptions } from 'sequelize-typescript';

export interface IDatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  rc: SequelizeOptions;
  production: SequelizeOptions;
}
