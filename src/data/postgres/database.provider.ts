import { ConfigService } from '@nestjs/config';
import { DataBasePostgresTascomConfig } from './database.config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const databaseConfig = new DataBasePostgresTascomConfig(
        new ConfigService(),
      );
      let config: SequelizeOptions;
      switch (process.env.NODE_ENV || '') {
        case 'development':
          config = databaseConfig.development;
          break;
        case 'test':
          config = databaseConfig.test;
          break;
        case 'rc':
          config = databaseConfig.rc;
          break;
        case 'production':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
          break;
      }
      const sequelize = new Sequelize({
        ...config,
        dialect: 'postgres',
        pool: {
          max: parseInt(process.env.POSTGRES_MAX_POOL_SIZE) || 20,
          min: 0,
          acquire: 120000,
        },
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
