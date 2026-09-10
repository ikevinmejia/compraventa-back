import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransmissionsService } from './transmissions.service';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';

@Controller('transmissions')
export class TransmissionsController {
  constructor(private readonly transmissionsService: TransmissionsService) {}

  @Post()
  create(@Body() createTransmissionDto: CreateTransmissionDto) {
    return this.transmissionsService.create(createTransmissionDto);
  }

  @Get()
  findAll() {
    return this.transmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransmissionDto: UpdateTransmissionDto) {
    return this.transmissionsService.update(+id, updateTransmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transmissionsService.remove(+id);
  }
}
