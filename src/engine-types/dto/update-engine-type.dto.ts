import { PartialType } from '@nestjs/swagger';
import { CreateEngineTypeDto } from './create-engine-type.dto';

export class UpdateEngineTypeDto extends PartialType(CreateEngineTypeDto) {}
