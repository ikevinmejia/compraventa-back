import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { Car } from '../cars/entities/car.entity';
import {
  AdjustmentType,
  ChassisDamage,
  EngineType,
  InventoryState,
  PaintCondition,
  RimsType,
  StructuralCondition,
  TiresCondition,
  Transmission,
} from '../common/entities/';
import { Model } from '../models/entities/model.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Brand,
      Model,
      EngineType,
      AdjustmentType,
      ChassisDamage,
      InventoryState,
      PaintCondition,
      RimsType,
      StructuralCondition,
      TiresCondition,
      Transmission,
    ]),
  ],
})
export class SeedModule {}
