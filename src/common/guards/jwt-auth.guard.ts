import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/auth.service';
import {
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

export function JwtAuthGuardMixin(roles: string[]): Type<any> {
  @Injectable()
  class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException({ message: 'Access token has expired', success: false, statusCode: 401 });
      }

      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException({ message: 'Invalid access token', success: false, statusCode: 401 });
      }

      if (err || !user) {
        throw new UnauthorizedException({ message: 'Access token has expired', success: false, statusCode: 401 });
      }

      if (!roles.includes(user.role)) {
        throw new ForbiddenException({ message: 'Access token unauthorized', success: false, statusCode: 403 });
      }

      return user;
    }
  }

  return mixin(JwtAuthGuard);
}