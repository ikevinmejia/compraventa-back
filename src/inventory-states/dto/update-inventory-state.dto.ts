import { PartialType } from '@nestjs/swagger';
import { CreateInventoryStateDto } from './create-inventory-state.dto';

export class UpdateInventoryStateDto extends PartialType(CreateInventoryStateDto) {}
