import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, Length, Matches, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: '1199080012345678' })
  @IsString()
  @IsNotEmpty({ message: 'National ID is required' })
  @Matches(/^[0-9]{16}$/, { message: 'National ID must contain exactly 16 digits' })
  nationalId!: string;

  @ApiProperty({ example: 'Jean Claude' })
  @IsString()
  @IsNotEmpty({ message: 'Employee name is required' })
  @Length(3, 100, { message: 'Employee name must be between 3 and 100 characters' })
  name!: string;

  @ApiProperty({ example: '1995-06-15' })
  @IsDateString({}, { message: 'dateOfBirth must be a valid date ex: 1995-06-15' })
  @IsNotEmpty({ message: 'dateOfBirth is required' })
  dateOfBirth!: string;

  @ApiProperty({ example: '2024-01-10' })
  @IsDateString({}, { message: 'hireDate must be a valid date ex: 2024-01-10' })
  @IsNotEmpty({ message: 'hireDate is required' })
  hireDate!: string;

  @Type(() => Number)
  @ApiProperty({ example: 850000 })
  @IsNumber({}, { message: 'grossSalary must be a number' })
  @Min(0, { message: 'grossSalary must be greater than or equal to 0' })
  @IsNotEmpty({ message: 'grossSalary is required' })
  grossSalary!: number;
}
