import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from 'src/modules/auth/user.entity';
import { Employer } from 'src/modules/employer/employer.entity';
import { Employee } from 'src/modules/employee/employee.entity';
import { Declaration } from 'src/modules/declaration/declaration.entity';
import { ContributionLine } from 'src/modules/contribution-line/contribution-line.entity';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions & DataSourceOptions = {
  ssl: false,
  logging: false,
  type: 'postgres',
  synchronize: false,
  host: process.env.DB_POSTGRESQL_HOST,
  port: Number(process.env.DB_POSTGRESQL_PORT),
  username: process.env.DB_POSTGRESQL_USERNAME,
  password: process.env.DB_POSTGRESQL_PASSWORD,
  database: process.env.DB_POSTGRESQL_DATABASE,
  entities: [User, Employer, Employee, Declaration, ContributionLine],
};
