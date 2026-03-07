import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Declaration } from './declaration.entity';
import { Employee } from '../employee/employee.entity';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { ContributionLine } from '../contribution-line/contribution-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Declaration, Employee, ContributionLine])],
  controllers: [DeclarationController],
  providers: [DeclarationService],
  exports: [DeclarationService],
})
export class DeclarationModule {}
