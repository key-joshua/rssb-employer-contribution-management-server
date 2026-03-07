import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsNotEmpty, Length, IsIn } from 'class-validator';

export class CreateDeclarationDto {
    @ApiProperty({ example: '2026-03' })
    @IsNotEmpty({ message: 'Period is required' })
    @IsString({ message: 'Period must be valid with format YYYY-MM, ex: 2026-01' })
    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Period must follow format YYYY-MM', })
    period!: string;

    @ApiProperty({ example: 'PAY-894U9U423923' })
    @IsString()
    @IsNotEmpty({ message: 'Payment number is required, ex: PAY-894U9U423923' })
    @Matches(/^PAY-[A-Z0-9]{10}$/, {message: 'Payment number must follow format PAY-XXXXXXXXXX (10 alphanumeric characters)' })
    paymentNumber!: string;
}

export class ValidateDeclarationDto {
   @ApiProperty({ example: 'validated' })
    @IsString()
    @IsNotEmpty({ message: 'status is required' })
    @Length(3, 50, { message: 'Status must be between 3 and 50 characters' })
    @IsIn( ['validated','rejected'], { message: 'Status must be one of the following: validated or rejected' })
    status!: string;
}