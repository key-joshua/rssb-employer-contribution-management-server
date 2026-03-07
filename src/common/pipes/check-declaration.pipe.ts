import { PipeTransform, Injectable, ConflictException, mixin, Type, BadRequestException } from '@nestjs/common';
import { Declaration, DeclarationStatus } from 'src/modules/declaration/declaration.entity';
import { DeclarationService } from 'src/modules/declaration/declaration.service';

export function CheckDeclarationFieldPipe(fields: string[]): Type<PipeTransform> {
  @Injectable()
  class CheckDeclarationFieldPipeMixin implements PipeTransform {
    constructor(public readonly declarationService: DeclarationService) {}

    async transform(value: any) {
      const employerId = 'd99f3060-90ee-4b46-afe7-dfea56e0d04a';

      for (const field of fields) {
        if (value[field] === undefined) continue;

        const declarationExist = await this.declarationService.findByAttribute({ employer: { id: employerId }, [field]: value[field], });
        if (declarationExist) {
          throw new ConflictException( `Declaration with ${field} "${value[field]}" already exists` );
        }
      }

      return value;
    }
  }

  return mixin(CheckDeclarationFieldPipeMixin);
}

export function CheckDeclarationParamPipe(field: string) {
  @Injectable()
  class CheckParamPipeMixin implements PipeTransform {
    constructor(public readonly declarationService: DeclarationService) {}

    async transform(value: string) {
      const declarationExist = await this.declarationService.findByAttribute({ [field]: value });

      if (!declarationExist) {
        throw new BadRequestException(`Declaration with ${field.toUpperCase()} "${value}" not exists.`);
      }

      return declarationExist;
    }
  }

  return mixin(CheckParamPipeMixin);
}

@Injectable()
export class CheckDeclarationDraftPipe implements PipeTransform {
  constructor(public readonly declarationService: DeclarationService) {}

  async transform(declaration: Declaration) {
    if (declaration && declaration.status !== DeclarationStatus.DRAFT) {
      throw new BadRequestException( `Only declarations with status "draft" can be modified. Current status is: "${declaration.status}".` );
    }

    return declaration;
  }
}

@Injectable()
export class CheckDeclarationSubmittedPipe implements PipeTransform {
  constructor(public readonly declarationService: DeclarationService) {}

  async transform(declaration: Declaration) {
    if (declaration && declaration.status !== DeclarationStatus.SUBMITTED) {
      throw new BadRequestException( `Only declarations with status "submitted" can be validated. Current status is: "${declaration.status}".` );
    }

    return declaration;
  }
}