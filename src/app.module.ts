import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './modules/health.module';
import { databaseConfig } from './database/database.config';
import { RateLimitGuard } from './common/guards/rate-limit.guard';
import { EmployerModule } from './modules/employer/employer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...databaseConfig, autoLoadEntities: true }),
    ThrottlerModule.forRoot([{ ttl: Number(process.env.RATE_LIMIT_TTL) || 60000, limit: Number(process.env.RATE_LIMIT_MAX) || 5 }]),

    HealthModule,
    EmployerModule,
  ],

  providers: [
    { provide: APP_GUARD, useClass: RateLimitGuard }
  ],
})

export class AppModule {}
