import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarLegalVerificationService } from './car-legal-verification.service';
import { CreateCarLegalVerificationDto } from './dto/create-car-legal-verification.dto';
import { UpdateCarLegalVerificationDto } from './dto/update-car-legal-verification.dto';

@Controller('car-legal-verification')
export class CarLegalVerificationController {
  constructor(private readonly carLegalVerificationService: CarLegalVerificationService) {}

  @Post()
  create(@Body() createCarLegalVerificationDto: CreateCarLegalVerificationDto) {
    return this.carLegalVerificationService.create(createCarLegalVerificationDto);
  }

  @Get()
  findAll() {
    return this.carLegalVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carLegalVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarLegalVerificationDto: UpdateCarLegalVerificationDto) {
    return this.carLegalVerificationService.update(+id, updateCarLegalVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carLegalVerificationService.remove(+id);
  }
}
