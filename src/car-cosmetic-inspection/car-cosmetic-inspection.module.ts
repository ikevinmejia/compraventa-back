import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdjustmentType,
  ChassisDamage,
  PaintCondition,
  RimsType,
  StructuralCondition,
  TiresCondition,
} from '../common/entities';
import { CarCosmeticInspectionController } from './car-cosmetic-inspection.controller';
import { CarCosmeticInspectionService } from './car-cosmetic-inspection.service';
import { CarCosmeticInspection } from './entities/car-cosmetic-inspection.entity';

@Module({
  controllers: [CarCosmeticInspectionController],
  providers: [CarCosmeticInspectionService],
  imports: [
    TypeOrmModule.forFeature([
      CarCosmeticInspection,
      RimsType,
      AdjustmentType,
      ChassisDamage,
      PaintCondition,
      StructuralCondition,
      TiresCondition,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class CarCosmeticInspectionModule {}
