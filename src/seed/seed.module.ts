import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { Car } from '../cars/entities/car.entity';
import { EngineType } from '../engine-types/entities/engine-type.entity';
import { InventoryState } from '../inventory-states/entities/inventory-state.entity';
import { Model } from '../models/entities/model.entity';
import { Transmission } from '../transmissions/entities/transmission.entity';
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
      InventoryState,
      Transmission,
    ]),
  ],
})
export class SeedModule {}
