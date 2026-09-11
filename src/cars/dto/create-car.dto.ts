import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  ENGINE_TYPE,
  INVENTARY_STATE,
  TYPE_TRANSSMISION,
} from '../interface/car.interface';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  // Convierte automáticamente el texto ingresado a mayúsculas
  @Transform(({ value }: { value: string }) => value?.toUpperCase().trim())
  // Valida que cumpla estrictamente el patrón de la placa
  @Matches(/^[A-Z]{3}[0-9]{3}$/, {
    message:
      'numberPlate: Debe tener un formato válido en Colombia (ej. ABC123).',
  })
  numberPlate: string;

  @IsString()
  @MaxLength(6)
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  brandId: number;

  @IsInt()
  @IsPositive()
  modelId: number;

  @IsInt()
  @IsPositive()
  year: number;

  @IsInt()
  @IsPositive()
  engineTypeId: number;

  // Se valida SOLO si NO es eléctrico
  @ValidateIf((o: CreateCarDto) => o.engineTypeId !== ENGINE_TYPE.ELECTRICO)
  @IsInt()
  @IsPositive()
  @Min(50, { message: 'displacement debe ser mayor a 50 cc' })
  displacement: number;

  @IsInt()
  @IsIn(Object.values(INVENTARY_STATE))
  @IsPositive()
  @IsOptional()
  inventoryStateId?: number;

  @IsInt()
  @IsPositive()
  @IsIn(Object.values(TYPE_TRANSSMISION))
  transmissionId: number;
}
