import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ example: 'employer@example.com' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({ example: 'StrongPass1!' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 50, { message: 'Password must be between 8 and 50 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'})
    password!: string;
}

export class SignInDto {
    @ApiProperty({ example: 'employer@example.com' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({ example: 'StrongPass1!' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'})
    password!: string;
}
