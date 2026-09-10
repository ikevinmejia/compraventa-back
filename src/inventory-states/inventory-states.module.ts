import { Module } from '@nestjs/common';
import { InventoryStatesService } from './inventory-states.service';
import { InventoryStatesController } from './inventory-states.controller';

@Module({
  controllers: [InventoryStatesController],
  providers: [InventoryStatesService],
})
export class InventoryStatesModule {}
