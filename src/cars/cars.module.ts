import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { CarCosmeticInspection } from '../car-cosmetic-inspection/entities/car-cosmetic-inspection.entity';
import { CarMechanicalInspection } from '../car-mechanical-inspections/entities/car-mechanical-inspection.entity';
import {
  EngineType,
  InventoryState,
  SuspensionCondition,
  Transmission,
  TransmissionCondition,
} from '../common/entities/';
import { Model } from '../models/entities/model.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Brand,
      Model,
      EngineType,
      Transmission,
      InventoryState,
      CarMechanicalInspection,
      CarCosmeticInspection,
      SuspensionCondition,
      TransmissionCondition,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class CarsModule {}
