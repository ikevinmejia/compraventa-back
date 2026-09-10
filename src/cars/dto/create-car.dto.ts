import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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
  @MaxLength(6)
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
    message: 'El cilindraje es obligatorio para motores térmicos e híbridos',
  })
  @IsNumber({}, { message: 'El cilindraje debe ser un número válido' })
  @Min(50, { message: 'El cilindraje debe ser mayor a 50 cc' })
  displacement?: number;

  @IsInt()
  @IsIn(Object.values(INVENTARY_STATE))
  @IsNotEmpty()
  inventoryStateId: number;

  @IsInt()
  @IsIn(Object.values(TYPE_TRANSSMISION))
  @IsNotEmpty()
  transmissionId: number;
}
