import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class WindowsCheckDto {
  @IsBoolean()
  fl: boolean; // front-left

  @IsBoolean()
  fr: boolean; // front-right

  @IsBoolean()
  rl: boolean; // rear-left

  @IsBoolean()
  rr: boolean; // rear-right
}

export class CreateCarCosmeticInspectionDto {
  electricWindowsFunctional: boolean;

  @ValidateNested()
  @Type(() => WindowsCheckDto)
  windowsCheckByDoor: WindowsCheckDto;

  @IsInt()
  @IsPositive()
  rimsTypeId: number;

  @IsInt()
  @IsPositive()
  tiresConditionId: number; // Estado de las llantas

  @IsInt()
  @IsPositive()
  steeringColumnAdjustmentId: number; // Ajuste de la cabrilla

  @IsInt()
  @IsPositive()
  mirrorsTypeId: number; // Vidrios manuales o electricos

  @IsBoolean()
  mirrorsFunctional: boolean;

  @IsInt()
  @IsPositive()
  paintConditionId: number; // Vidrios manuales o electricos

  @IsBoolean()
  hoodDents: boolean; // Capó presenta golpes?

  @IsInt()
  @IsPositive()
  chassisFrontDamageId: number;
  @IsInt()
  @IsPositive()
  driverDoorPillarId: number;
  @IsInt()
  @IsPositive()
  passengerDoorPillarId: number;

  @IsBoolean()
  doorsOpenProperly: boolean; // puertas abren bien?

  @IsInt()
  @IsPositive()
  trunkStructureId: number; // estructura del maletero

  @IsInt()
  @IsPositive()
  trunkFloorId: number; // Estructura del piso del maletero

  @IsBoolean()
  trunkHasRust: boolean; // Maletero tiene podridos?

  @IsBoolean()
  hasSpareTire: boolean; // Llanta de repuesto

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  additionalObservations?: string; // Llanta de repuesto
}
