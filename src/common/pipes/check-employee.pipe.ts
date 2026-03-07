import { EmployeeService } from './../../modules/employee/employee.service';
import { PipeTransform, Injectable, ConflictException, mixin, Type, } from '@nestjs/common';

export function CheckEmployeeFieldPipe(fields: string[]): Type<PipeTransform> {
  @Injectable()
  class CheckEmployeeFieldPipeMixin implements PipeTransform {
    constructor(public readonly employeeService: EmployeeService) {}

    async transform(value: any) {
      for (const field of fields) {
        if (value[field] === undefined) continue;

        const employeeExist = await this.employeeService.findByAttribute({ [field]: value[field] });

        if (employeeExist) {
          throw new ConflictException( `Employee with ${field} "${value[field]}" already exists`, );
        }
      }

      return value;
    }
  }

  return mixin(CheckEmployeeFieldPipeMixin);
}
