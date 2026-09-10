import { Module } from '@nestjs/common';
import { TransmissionsService } from './transmissions.service';
import { TransmissionsController } from './transmissions.controller';

@Module({
  controllers: [TransmissionsController],
  providers: [TransmissionsService],
})
export class TransmissionsModule {}
