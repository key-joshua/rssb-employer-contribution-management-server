import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches, Length, IsDateString, IsIn } from 'class-validator';

export class CreateEmployerDto {
    @ApiProperty({ example: 'Tech Rwanda Ltd' })
    @IsString()  
    @IsNotEmpty({ message: 'Employer name is required' })
    @Length(3, 100, { message: 'Employer name must be between 3 and 100 characters' })
    name!: string;

    @ApiProperty({ example: 'TIN-894U9U423923' })
    @IsString()
    @IsNotEmpty({ message: 'TIN is required' })
    @Matches(/^TIN-[A-Z0-9]{12}$/, { message: 'TIN must follow format TIN-XXXXXXXXXXXX (12 alphanumeric characters)' })
    tin!: string;

    @ApiProperty({ example: 'Technology' })
    @IsString()
    @IsNotEmpty({ message: 'Sector is required' })
    @Length(3, 50, { message: 'Sector must be between 3 and 50 characters' })
    @IsIn( ['Technology','Security','Healthcare', 'Finance', 'Education', 'Manufacturing', 'Energy'], { message: 'Sector must be one of the following: Technology, Security, Healthcare, Finance, Education, Manufacturing and Energy' })
    sector!: string;

    @ApiProperty({ example: '2026-03-05' })
    @IsDateString({}, { message: 'registrationDate must be a valid date ex: 2026-03-05' })
    @IsNotEmpty({ message: 'registrationDate is required' })
    registrationDate!: string;
}

export class UpdateEmployerDto {
  @ApiPropertyOptional({ example: 'Tech Rwanda Ltd' })
  @IsString()
  @IsOptional()
  @Length(3, 100, { message: 'Employer name must be between 3 and 100 characters' })
  name?: string;

  @ApiPropertyOptional({ example: 'TIN-894U9U423923' })
  @IsString()
  @IsOptional()
  @Matches(/^TIN-[A-Z0-9]{12}$/, { message: 'TIN must follow format TIN-XXXXXXXXXXXX (12 characters)' })
  tin?: string;

  @ApiPropertyOptional({ example: 'Technology' })
  @IsString()
  @IsOptional()
  @Length(3, 50, { message: 'Sector must be between 3 and 50 characters' })
  @IsIn(['Technology','Security','Healthcare', 'Finance', 'Education', 'Manufacturing', 'Energy'], { message: 'Sector must be one of the following: Technology, Security, Healthcare, Finance, Education, Manufacturing, Energy' })
  sector?: string;

  @ApiPropertyOptional({ example: '2026-03-05' })
  @IsOptional()
  @IsDateString({}, { message: 'registrationDate must be a valid date ex: 2026-03-05' })
  registrationDate?: string;
}
