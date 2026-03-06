import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = Number(process.env.PAGE_NUMBER) || 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(Number(process.env.PAGE_MAX) || 100)
  limit?: number = Number(process.env.PAGE_SIZE) || 10;
}
