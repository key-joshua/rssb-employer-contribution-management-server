import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employer } from './employer.entity';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})

export class EmployerModule {}
