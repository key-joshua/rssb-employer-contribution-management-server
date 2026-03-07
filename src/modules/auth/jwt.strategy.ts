import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'SUPER_SECRET_KEY',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const userExist = await this.authService.findByAttribute({ id: payload.id });

    if (!userExist) {
      throw new UnauthorizedException({
        message: 'Invalid access token',
        success: false,
        statusCode: 401,
      });
    }

    return { id: payload.id, role: userExist.role };
  }
}