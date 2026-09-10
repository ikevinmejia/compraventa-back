import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { EngineType } from '../engine-types/entities/engine-type.entity';
import { InventoryState } from '../inventory-states/entities/inventory-state.entity';
import { Model } from '../models/entities/model.entity';
import { Transmission } from '../transmissions/entities/transmission.entity';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepo: Repository<Model>,
    @InjectRepository(EngineType)
    private readonly engineTypeRepo: Repository<EngineType>,
    @InjectRepository(Transmission)
    private readonly transmissionRepo: Repository<Transmission>,
    @InjectRepository(InventoryState)
    private readonly inventoryStateRepo: Repository<InventoryState>,
  ) {}

  async runSeed() {
    await this.seedCatalogs();
    await this.seedBrandsAndModels();
  }

  private async seedCatalogs() {
    // 1. Catálogos estáticos simples
    for (const [index, name] of initialData.engineTypes.entries()) {
      await this.engineTypeRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.transmissions.entries()) {
      await this.transmissionRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.inventoryStates.entries()) {
      await this.inventoryStateRepo.save({ id: index + 1, name });
    }
  }

  private async seedBrandsAndModels() {
    // 2. Poblar Marcas y Modelos manteniendo la relación
    for (const brandData of initialData.brands) {
      // Guardamos o buscamos la marca
      let brand = await this.brandRepo.findOneBy({ name: brandData.name });
      if (!brand) {
        brand = await this.brandRepo.save(
          this.brandRepo.create({ name: brandData.name }),
        );
      }

      // Con la marca guardada (que ya tiene su brand.id), insertamos sus modelos
      for (const modelName of brandData.models) {
        const exists = await this.modelRepo.findOneBy({
          name: modelName,
          brandId: brand.id,
        });
        if (!exists) {
          await this.modelRepo.save(
            this.modelRepo.create({
              name: modelName,
              brandId: brand.id, // Se asigna el ID obtenido de la BD
            }),
          );
        }
      }
    }
  }
}
