import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './modules/health.module';
import { RateLimitGuard } from './common/guards/rate-limit.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]),
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule
  ],

  providers: [
    { provide: APP_GUARD, useClass: RateLimitGuard }
  ],
})

export class AppModule {}
