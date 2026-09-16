import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enabledImplicitConversions: true
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number) // enabledImplicitConversions: true
  @Min(0)
  @IsInt()
  @Min(1)
  @Max(100)
  offset?: number;
}
