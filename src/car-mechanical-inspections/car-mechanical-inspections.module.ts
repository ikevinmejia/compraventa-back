import { Module } from '@nestjs/common';
import { CarMechanicalInspectionsService } from './car-mechanical-inspections.service';
import { CarMechanicalInspectionsController } from './car-mechanical-inspections.controller';

@Module({
  controllers: [CarMechanicalInspectionsController],
  providers: [CarMechanicalInspectionsService],
})
export class CarMechanicalInspectionsModule {}
