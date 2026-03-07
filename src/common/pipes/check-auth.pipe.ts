import { JwtService } from '@nestjs/jwt';
import { PipeTransform, Injectable, ConflictException, mixin, Type, UnauthorizedException, Body } from '@nestjs/common';

import { User } from 'src/modules/auth/user.entity';
import { comparePassword } from '../utils/password.util';
import { AuthService } from 'src/modules/auth/auth.service';

export function CheckUserFieldPipe(fields: string[]): Type<PipeTransform> {
  @Injectable()
  class CheckUserFieldPipeMixin implements PipeTransform {
    constructor(public readonly authService: AuthService) {}

    async transform(value: any) {
      for (const field of fields) {
        if (value[field] === undefined) continue;

        const userExist = await this.authService.findByAttribute({ [field]: value[field] });

        if (userExist) {
          throw new ConflictException(`User with ${field} "${value[field]}" already exists`);
        }
      }

      return value;
    }
  }

  return mixin(CheckUserFieldPipeMixin);
}

export function CheckUserAccountPipe(fields: string[]): Type<PipeTransform> {

  @Injectable()
  class CheckUserAccountPipeMixin implements PipeTransform {
    constructor(public readonly authService: AuthService, private readonly jwtService: JwtService) {}

    async transform(value: any) {

      let user: User | null = null;
      let accessToken: string | undefined;

      for (const field of fields) {
        if (value[field] === undefined) continue;

        user = await this.authService.findByAttribute({ [field]: value[field] });
        if (!user) {
          throw new UnauthorizedException('Email or password is incorrect.');
        }

        const isPasswordValid = comparePassword(value.password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Email or password is incorrect.');
        }

        accessToken = this.jwtService.sign({id: user.id });
      }

      return { user, accessToken };
    }
  }

  return mixin(CheckUserAccountPipeMixin);
}
