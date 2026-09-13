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
import { CarCosmeticInspectionService } from './car-cosmetic-inspection.service';
import { CreateCarCosmeticInspectionDto } from './dto/create-car-cosmetic-inspection.dto';
import { UpdateCarCosmeticInspectionDto } from './dto/update-car-cosmetic-inspection.dto';

@Controller('car-cosmetic-inspection')
export class CarCosmeticInspectionController {
  constructor(
    private readonly carCosmeticInspectionService: CarCosmeticInspectionService,
  ) {}

  @Post(':carId')
  create(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() createCarCosmeticInspectionDto: CreateCarCosmeticInspectionDto,
  ) {
    return this.carCosmeticInspectionService.create(
      carId,
      createCarCosmeticInspectionDto,
    );
  }

  @Get()
  findAll() {
    return this.carCosmeticInspectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carCosmeticInspectionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarCosmeticInspectionDto: UpdateCarCosmeticInspectionDto,
  ) {
    return this.carCosmeticInspectionService.update(
      id,
      updateCarCosmeticInspectionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carCosmeticInspectionService.remove(id);
  }
}
