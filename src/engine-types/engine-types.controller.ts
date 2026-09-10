import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EngineTypesService } from './engine-types.service';
import { CreateEngineTypeDto } from './dto/create-engine-type.dto';
import { UpdateEngineTypeDto } from './dto/update-engine-type.dto';

@Controller('engine-types')
export class EngineTypesController {
  constructor(private readonly engineTypesService: EngineTypesService) {}

  @Post()
  create(@Body() createEngineTypeDto: CreateEngineTypeDto) {
    return this.engineTypesService.create(createEngineTypeDto);
  }

  @Get()
  findAll() {
    return this.engineTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngineTypeDto: UpdateEngineTypeDto) {
    return this.engineTypesService.update(+id, updateEngineTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineTypesService.remove(+id);
  }
}
