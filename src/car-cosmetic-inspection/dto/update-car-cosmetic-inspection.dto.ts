import { PartialType } from '@nestjs/swagger';
import { CreateCarCosmeticInspectionDto } from './create-car-cosmetic-inspection.dto';

export class UpdateCarCosmeticInspectionDto extends PartialType(CreateCarCosmeticInspectionDto) {}
