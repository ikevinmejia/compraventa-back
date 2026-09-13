import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';
import { Brand } from '../brands/entities/brand.entity';
import {
  AdjustmentType,
  ChassisDamage,
  EngineType,
  InventoryState,
  PaintCondition,
  RimsType,
  StructuralCondition,
  SuspensionCondition,
  TiresCondition,
  Transmission,
  TransmissionCondition,
} from '../common/entities';

import { Department } from '../departments/entities/department.entity';
import { Model } from '../models/entities/model.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { colombiaJson } from './data/colombia-json';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(Department)
    private readonly departamentRepo: Repository<Department>,
    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,

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
    @InjectRepository(AdjustmentType)
    private readonly adjustmentTypeRepo: Repository<AdjustmentType>,
    @InjectRepository(ChassisDamage)
    private readonly chassisDamageRepo: Repository<ChassisDamage>,
    @InjectRepository(PaintCondition)
    private readonly paintConditionRepo: Repository<PaintCondition>,
    @InjectRepository(RimsType)
    private readonly rimsTypeRepo: Repository<RimsType>,
    @InjectRepository(StructuralCondition)
    private readonly structuralConditionRepo: Repository<StructuralCondition>,
    @InjectRepository(TiresCondition)
    private readonly tiresConditionRepo: Repository<TiresCondition>,
    @InjectRepository(SuspensionCondition)
    private readonly suspensionConditionRepo: Repository<SuspensionCondition>,
    @InjectRepository(TransmissionCondition)
    private readonly transmissionConditionRepo: Repository<TransmissionCondition>,
  ) {}

  async runSeed() {
    await this.clearDatabase(); // Limpia toda la base de datos
    await this.seedColombia();
    await this.seedCatalogs();
    await this.seedBrandsAndModels();
    return 'Seed generated';
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

    for (const [index, name] of initialData.adjustmentType.entries()) {
      await this.adjustmentTypeRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.chassisDamage.entries()) {
      await this.chassisDamageRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.paintCondition.entries()) {
      await this.paintConditionRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.rimsType.entries()) {
      await this.rimsTypeRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.structuralCondition.entries()) {
      await this.structuralConditionRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.tiresCondition.entries()) {
      await this.tiresConditionRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.suspensionCondition.entries()) {
      await this.suspensionConditionRepo.save({ id: index + 1, name });
    }

    for (const [index, name] of initialData.transmissionCondition.entries()) {
      await this.transmissionConditionRepo.save({ id: index + 1, name });
    }
  }

  private async seedColombia() {
    // 1 Poblar los departamentos y municipios relacionados
    for (const { departamento, id, ciudades } of colombiaJson) {
      const dprtmnto = this.departamentRepo.create({ name: departamento, id });

      await this.departamentRepo.save(dprtmnto);

      // 2. Poblar los municipios de acuerdo a su departamento

      for (const municipio of ciudades) {
        const mncpio = this.municipalityRepo.create({
          departmentId: id,
          name: municipio,
        });

        await this.municipalityRepo.save(mncpio);
      }
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

  private async clearDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      // TRUNCATE elimina los datos y RESTART IDENTITY reinicia los IDs a 1
      // CASCADE elimina automáticamente los registros de tablas hijas

      await queryRunner.query(`
        TRUNCATE TABLE
        "cars",
        "models",
        "brands",
        "engine_types",
        "transmissions",
        "inventory_states",
        "adjustment_types",
        "structural_conditions",
        "rims_types",
        "tires_conditions",
        "paint_conditions",
        "chassis_damages",
        "suspension_conditions",
        "transmission_conditions",
        "car_cosmetic_inspections",
        "car_mechanical_inspections",
        "municipalities",
        "departments"
        RESTART IDENTITY CASCADE;
        `);
    } catch (error) {
      console.error('Error limpiando la base de datos:', error);
      throw new InternalServerErrorException('Error limpiando base de datos');
    } finally {
      await queryRunner.release();
    }
  }
}
