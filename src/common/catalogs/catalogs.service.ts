import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { type Cache } from 'cache-manager';
import { Repository } from 'typeorm';
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
import { CatalogItem } from './interfaces/catalog-item.interface';

const CATALOG_MAP = {
  'rims-types': RimsType,
  'tires-conditions': TiresCondition,
  'adjustment-types': AdjustmentType,
  'paint-conditions': PaintCondition,
  'chassis-damages': ChassisDamage,
  'structural-conditions': StructuralCondition,
  'transmission-conditions': TransmissionCondition,
  'suspension-conditions': SuspensionCondition,
  'insurance-claim-types': InsuranceClaimType,
  'runt-pending-issues': RuntPendingIssue,
  'inventory-states': InventoryState,
} as const;

export type CatalogName = keyof typeof CATALOG_MAP;

@Injectable()
export class CatalogsService {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(catalogName: CatalogName): Promise<CatalogItem[]> {
    const entity = CATALOG_MAP[catalogName];

    if (!entity) {
      throw new NotFoundException(`Catalog "${catalogName}" not found`);
    }

    const cacheKey = `catalog:${catalogName}`;

    // 1. Intentamos traerlo de la caché primero
    const cached = await this.cacheManager.get<CatalogItem[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const repo = this.moduleRef.get<Repository<CatalogItem>>(
      getRepositoryToken(entity),
      { strict: false },
    );

    const result = await repo.find();

    // 3. Guardamos el resultado en caché para la próxima vez
    await this.cacheManager.set(cacheKey, result);

    return result;
  }
}
