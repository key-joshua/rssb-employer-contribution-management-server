import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { User } from './user.entity';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/common/dto/auth.dto';
import { hashPassword } from 'src/common/utils/password.util';
import { CheckUserAccountPipe, CheckUserFieldPipe } from 'src/common/pipes/check-auth.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'Endpoint(API) for user signup' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully.' })
    async signup(@Body(CheckUserFieldPipe(['email'])) body: SignUpDto ): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: User; }> {
        const user = await this.authService.create({ ...body, password: hashPassword(body.password) });

        return {
        message: 'User registered successfully.',
        statusCode: HttpStatus.CREATED,
        success: true,
        data: user
        };
    }

    @Post('/signin')
    @ApiOperation({ summary: 'Endpoint(API) for user signin' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User signed in successfully.' })
    async signin( @Body(CheckUserAccountPipe(['email'])) { user, accessToken }: { user: User; accessToken: string } ): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: { accessToken: string }; }> {

        return {
            message: 'User signed in successfully',
            statusCode: HttpStatus.OK,
            success: true,
            data: { accessToken }
        };
    }
}
