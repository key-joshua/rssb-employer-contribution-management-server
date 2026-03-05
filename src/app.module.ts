import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './modules/health.module';
import { databaseConfig } from './database/database.config';
import { RateLimitGuard } from './common/guards/rate-limit.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]),
    TypeOrmModule.forRoot({ ...databaseConfig, autoLoadEntities: true, }),

    HealthModule
  ],

  providers: [
    { provide: APP_GUARD, useClass: RateLimitGuard }
  ],
})

export class AppModule {}
