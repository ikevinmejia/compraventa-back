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
import { CarLegalVerificationService } from './car-legal-verification.service';
import { CreateCarLegalVerificationDto } from './dto/create-car-legal-verification.dto';
import { UpdateCarLegalVerificationDto } from './dto/update-car-legal-verification.dto';

@Controller('car-legal-verification')
export class CarLegalVerificationController {
  constructor(
    private readonly carLegalVerificationService: CarLegalVerificationService,
  ) {}

  @Post(':carId')
  create(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() createCarLegalVerificationDto: CreateCarLegalVerificationDto,
  ) {
    return this.carLegalVerificationService.create(
      carId,
      createCarLegalVerificationDto,
    );
  }

  @Get()
  findAll() {
    return this.carLegalVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carLegalVerificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarLegalVerificationDto: UpdateCarLegalVerificationDto,
  ) {
    return this.carLegalVerificationService.update(
      id,
      updateCarLegalVerificationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carLegalVerificationService.remove(id);
  }
}
