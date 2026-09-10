import { Injectable } from '@nestjs/common';
import { CreateInventoryStateDto } from './dto/create-inventory-state.dto';
import { UpdateInventoryStateDto } from './dto/update-inventory-state.dto';

@Injectable()
export class InventoryStatesService {
  create(createInventoryStateDto: CreateInventoryStateDto) {
    return 'This action adds a new inventoryState';
  }

  findAll() {
    return `This action returns all inventoryStates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryState`;
  }

  update(id: number, updateInventoryStateDto: UpdateInventoryStateDto) {
    return `This action updates a #${id} inventoryState`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryState`;
  }
}
