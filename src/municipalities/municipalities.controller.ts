import { Controller, Get, Param } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Get(':municipalityId')
  findOne(@Param('municipalityId') municipalityId: number) {
    return this.municipalitiesService.findOne(municipalityId);
  }
}
