import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarMechanicalInspectionsService } from './car-mechanical-inspections.service';
import { CreateCarMechanicalInspectionDto } from './dto/create-car-mechanical-inspection.dto';
import { UpdateCarMechanicalInspectionDto } from './dto/update-car-mechanical-inspection.dto';

@Controller('car-mechanical-inspections')
export class CarMechanicalInspectionsController {
  constructor(
    private readonly carMechanicalInspectionsService: CarMechanicalInspectionsService,
  ) {}

  @Post(':carId')
  create(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() createCarMechanicalInspectionDto: CreateCarMechanicalInspectionDto,
  ) {
    return this.carMechanicalInspectionsService.create(
      carId,
      createCarMechanicalInspectionDto,
    );
  }

  @Get()
  findAll() {
    return this.carMechanicalInspectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carMechanicalInspectionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarMechanicalInspectionDto: UpdateCarMechanicalInspectionDto,
  ) {
    return this.carMechanicalInspectionsService.update(
      id,
      updateCarMechanicalInspectionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carMechanicalInspectionsService.remove(id);
  }
}
