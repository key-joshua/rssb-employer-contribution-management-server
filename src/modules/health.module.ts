import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { EmployerModule } from './employer/employer.module';

@Module({
  controllers: [HealthController],
  imports: [EmployerModule]
})

export class HealthModule {}
