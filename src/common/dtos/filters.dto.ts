// cars/dto/find-cars-query.dto.ts
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class FindCarsQueryDto extends PaginationDto {
  // Placa, marca o modelo
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  brandId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  modelId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  engineTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  transmissionId?: number;

  // Fecha de ingreso, formato YYYY-MM-DD
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'entryDate debe tener formato YYYY-MM-DD',
  })
  entryDate?: string;
}
