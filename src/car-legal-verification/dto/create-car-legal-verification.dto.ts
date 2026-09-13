import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateCarLegalVerificationDto {
  @IsPositive()
  @IsNotEmpty()
  registrationDepartmentId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  registrationCityId: number;

  @Type(() => Date)
  @IsDate()
  soatExpirationDate: Date; // vigencia de soat

  @Type(() => Date)
  @IsDate()
  technicalInspectionExpirationDate: Date; // vigencia tecnomecanica

  @IsBoolean()
  hasTrafficFines: boolean; // Tiene fotomultas?

  @IsInt()
  @Min(0)
  trafficFinesCount: number; // Cantidad de multas

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  trafficFinesTotalAmount: number; // Total en dinero de multas

  @IsBoolean()
  taxesUpToDate: boolean; // Impuestos al día si o no

  @IsInt()
  @Min(0)
  taxesOwedYears: number; // Años de deuda de impuestos

  @IsBoolean()
  runtMatchesLicense: boolean; // Coincide la licencia con el runt?

  @IsBoolean()
  runtHasLiens: boolean; // Tiene gravamenes?

  @ValidateIf((dto: CreateCarLegalVerificationDto) => dto.runtHasLiens === true)
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  runtPendingIssueIds?: number[];

  @IsBoolean()
  municipalTrafficLightTaxUpToDate: boolean; // Esta al día impuesto municipal - semaforización

  @IsBoolean()
  hadPublicServiceUse: boolean; // Tuvo uso público?

  @IsBoolean()
  hasInsuranceClaims: boolean; // Tiene siniestros?

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  insuranceClaimTypeId: number;
}
