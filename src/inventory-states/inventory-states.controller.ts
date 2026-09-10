import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryStatesService } from './inventory-states.service';
import { CreateInventoryStateDto } from './dto/create-inventory-state.dto';
import { UpdateInventoryStateDto } from './dto/update-inventory-state.dto';

@Controller('inventory-states')
export class InventoryStatesController {
  constructor(private readonly inventoryStatesService: InventoryStatesService) {}

  @Post()
  create(@Body() createInventoryStateDto: CreateInventoryStateDto) {
    return this.inventoryStatesService.create(createInventoryStateDto);
  }

  @Get()
  findAll() {
    return this.inventoryStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryStatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryStateDto: UpdateInventoryStateDto) {
    return this.inventoryStatesService.update(+id, updateInventoryStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryStatesService.remove(+id);
  }
}
