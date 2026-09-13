import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdjustmentType,
  ChassisDamage,
  InsuranceClaimType,
  InventoryState,
  PaintCondition,
  RimsType,
  RuntPendingIssue,
  StructuralCondition,
  SuspensionCondition,
  TiresCondition,
  TransmissionCondition,
} from '../entities';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RimsType,
      TiresCondition,
      AdjustmentType,
      PaintCondition,
      ChassisDamage,
      StructuralCondition,
      TransmissionCondition,
      SuspensionCondition,
      InsuranceClaimType,
      RuntPendingIssue,
      InventoryState,
    ]),
    CacheModule.register({
      ttl: 3600 * 1000, // 1 hora, en milisegundos
    }),
  ],
  controllers: [CatalogsController],
  providers: [CatalogsService],
})
export class CatalogsModule {}
