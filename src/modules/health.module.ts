import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { EmployerModule } from './employer/employer.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  controllers: [HealthController],
  imports: [EmployerModule, EmployeeModule]
})

export class HealthModule {}
