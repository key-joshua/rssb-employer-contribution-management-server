import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions & DataSourceOptions = {
  ssl: false,
  logging: true,
  type: 'postgres',
  synchronize: false,
  host: process.env.DB_POSTGRESQL_HOST,
  port: Number(process.env.DB_POSTGRESQL_PORT),
  username: process.env.DB_POSTGRESQL_USERNAME,
  password: process.env.DB_POSTGRESQL_PASSWORD,
  database: process.env.DB_POSTGRESQL_DATABASE,
};
