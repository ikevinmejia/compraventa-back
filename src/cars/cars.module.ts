import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { EngineType, InventoryState, Transmission } from '../common/entities/';
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
    ]),
  ],
  exports: [TypeOrmModule],
})
export class CarsModule {}
