import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

export const AppDataSource = new DataSource({
  ...databaseConfig,
  entities: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
  migrations: ['dist/database/migrations/*.js', 'src/database/migrations/*.ts'],
});