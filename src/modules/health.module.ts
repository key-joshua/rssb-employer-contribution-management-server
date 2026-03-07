import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { EmployerModule } from './employer/employer.module';
import { EmployeeModule } from './employee/employee.module';
import { DeclarationModule } from './declaration/declaration.module';

@Module({
  controllers: [HealthController],
  imports: [EmployerModule, EmployeeModule, DeclarationModule]
})

export class HealthModule {}
