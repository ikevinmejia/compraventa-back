import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsNotEmpty()
  brandId: number;

  @IsInt()
  @IsNotEmpty()
  modelId: number;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsInt()
  @IsNotEmpty()
  engineTypeId: number;

  // Se valida SOLO si NO es eléctrico
  @ValidateIf((o: CreateCarDto) => o.engineTypeId !== ENGINE_TYPE.ELECTRICO)
  @IsNotEmpty({
    message: 'displacement es obligatorio para motores térmicos e híbridos',
  })
  @IsNumber({}, { message: 'displacement debe ser un número válido' })
  @Min(50, { message: 'displacement debe ser mayor a 50 cc' })
  displacement: number;

  @IsInt()
  @IsIn(Object.values(INVENTARY_STATE))
  @IsNotEmpty()
  inventoryStateId: number;

  @IsInt()
  @IsIn(Object.values(TYPE_TRANSSMISION))
  @IsNotEmpty()
  transmissionId: number;
}
