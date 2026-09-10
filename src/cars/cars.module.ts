import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { EngineType } from '../engine-types/entities/engine-type.entity';
import { InventoryState } from '../inventory-states/entities/inventory-state.entity';
import { Model } from '../models/entities/model.entity';
import { Transmission } from '../transmissions/entities/transmission.entity';
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
    ]),
  ],
})
export class CarsModule {}
