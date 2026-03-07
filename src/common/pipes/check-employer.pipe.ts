import { REQUEST } from '@nestjs/core';
import { EmployerService } from 'src/modules/employer/employer.service';
import { PipeTransform, Injectable, ConflictException, BadRequestException, mixin, Type, Inject, } from '@nestjs/common';

export function CheckEmployerFieldPipe(fields: string[]): Type<PipeTransform> {
  @Injectable()
  class CheckEmployerFieldPipeMixin implements PipeTransform {
    constructor(public readonly employerService: EmployerService, @Inject(REQUEST) private readonly request: Request) {}

    async transform(value: any) {
      const req: any = this.request;
      const employerId = req.user?.id;

      if (!employerId) {
        throw new BadRequestException('Invalid access token. Employer information is missing.');
      }

      const existingEmployer = await this.employerService.findByAttribute({ user: { id: employerId } });
      if (existingEmployer) {
        throw new ConflictException('This user already has an employer profile.');
      }

      for (const field of fields) {
        if (value[field] === undefined) continue;

        const employerExist = await this.employerService.findByAttribute({ [field]: value[field] });
        if (employerExist) {
          throw new ConflictException(`Employer with ${field} "${value[field]}" already exists`);
        }
      }

      return value;
    }
  }

  return mixin(CheckEmployerFieldPipeMixin);
}

export function CheckEmployerParamPipe(field: string) {
  @Injectable()
  class CheckParamPipeMixin implements PipeTransform {
    constructor(public readonly employerService: EmployerService) {}

    async transform(value: string) {
      const employerExist = await this.employerService.findByAttribute({ [field]: value });

      if (!employerExist) {
        throw new BadRequestException(`Employer with ${field.toUpperCase()} "${value}" not exists.`);
      }

      return employerExist;
    }
  }

  return mixin(CheckParamPipeMixin);
}
