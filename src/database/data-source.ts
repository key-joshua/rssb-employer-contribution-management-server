import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

export const AppDataSource = new DataSource({
  ...databaseConfig,
  migrations: ['dist/database/migrations/*.js', 'src/database/migrations/*.ts'],
});
