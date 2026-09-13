import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { MunicipalitiesController } from './municipalities.controller';
import { MunicipalitiesService } from './municipalities.service';

@Module({
  controllers: [MunicipalitiesController],
  providers: [MunicipalitiesService],
  imports: [TypeOrmModule.forFeature([Municipality])],
})
export class MunicipalitiesModule {}
