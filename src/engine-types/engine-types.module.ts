import { Module } from '@nestjs/common';
import { EngineTypesService } from './engine-types.service';
import { EngineTypesController } from './engine-types.controller';

@Module({
  controllers: [EngineTypesController],
  providers: [EngineTypesService],
})
export class EngineTypesModule {}
