import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { CarCosmeticInspection } from '../car-cosmetic-inspection/entities/car-cosmetic-inspection.entity';
import { CarMechanicalInspection } from '../car-mechanical-inspections/entities/car-mechanical-inspection.entity';
import { Car } from '../cars/entities/car.entity';
import {
  AdjustmentType,
  ChassisDamage,
  Departamento,
  EngineType,
  InventoryState,
  Municipio,
  PaintCondition,
  RimsType,
  StructuralCondition,
  SuspensionCondition,
  TiresCondition,
  Transmission,
  TransmissionCondition,
} from '../common/entities/';
import { Model } from '../models/entities/model.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([
      Departamento,
      Municipio,

      Car,
      Brand,
      Model,
      CarMechanicalInspection,
      CarCosmeticInspection,
      EngineType,
      AdjustmentType,
      ChassisDamage,
      InventoryState,
      PaintCondition,
      RimsType,
      StructuralCondition,
      TiresCondition,
      Transmission,
      SuspensionCondition,
      TransmissionCondition,
    ]),
  ],
})
export class SeedModule {}
