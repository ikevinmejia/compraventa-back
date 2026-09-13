import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCarMechanicalInspectionDto {
  hasEngineLeaks: boolean; // Tiene fugas el motor

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  engineLeaksDetail?: string; // Detalle de fugaz

  @IsInt()
  @IsNotEmpty()
  transmissionConditionId: number;

  @IsInt()
  @IsNotEmpty()
  suspensionConditionId: number;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  additionalMechanicalObservations?: string; // Observaciones
}
