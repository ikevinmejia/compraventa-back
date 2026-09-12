import { PartialType } from '@nestjs/swagger';
import { CreateCarMechanicalInspectionDto } from './create-car-mechanical-inspection.dto';

export class UpdateCarMechanicalInspectionDto extends PartialType(CreateCarMechanicalInspectionDto) {}
