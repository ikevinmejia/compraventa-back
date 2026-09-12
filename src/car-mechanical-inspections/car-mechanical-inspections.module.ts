import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMechanicalInspectionsController } from './car-mechanical-inspections.controller';
import { CarMechanicalInspectionsService } from './car-mechanical-inspections.service';
import { CarMechanicalInspection } from './entities/car-mechanical-inspection.entity';

@Module({
  controllers: [CarMechanicalInspectionsController],
  providers: [CarMechanicalInspectionsService],
  imports: [TypeOrmModule.forFeature([CarMechanicalInspection])],
})
export class CarMechanicalInspectionsModule {}
