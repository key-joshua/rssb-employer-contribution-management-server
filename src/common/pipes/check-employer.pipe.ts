import { EmployerService } from 'src/modules/employer/employer.service';
import { PipeTransform, Injectable, ConflictException, BadRequestException, mixin, Type, } from '@nestjs/common';

export function CheckEmployerFieldPipe(fields: string[]): Type<PipeTransform> {
  @Injectable()
  class CheckEmployerFieldPipeMixin implements PipeTransform {
    constructor(public readonly employerService: EmployerService) {}

    async transform(value: any) {
      for (const field of fields) {
        if (value[field] === undefined) continue;

        const employerExist = await this.employerService.findByAttribute({ [field]: value[field] });

        if (employerExist) {
          throw new ConflictException(
            `Employer with ${field} "${value[field]}" already exists`,
          );
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
