import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), JwtModule.register({ secret: process.env.JWT_SECRET_KEY || 'SUPER_SECRET_KEY', signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600') } }) ],
  controllers: [AuthController],
  
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
