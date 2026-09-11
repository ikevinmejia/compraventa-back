import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { CarCosmeticInspection } from '../../car-cosmetic-inspection/entities/car-cosmetic-inspection.entity';
import { EngineType } from '../../common/entities/engine-type.entity';
import { InventoryState } from '../../common/entities/inventory-state.entity';
import { Transmission } from '../../common/entities/transmission.entity';
import { Model } from '../../models/entities/model.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  numberPlate: string;

  @Column('int')
  year: number;

  @Column('int', { nullable: true })
  displacement?: number;

  @Column('text', { unique: true })
  slug?: string;

  // --- Relaciones (FOREIGN KEYS) ---

  // * Relación de Brand (Marca)

  @ManyToOne(() => Brand, { nullable: false })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column('int')
  brandId: number;

  // * Relacion Model (Modelo)

  @ManyToOne(() => Model, { nullable: false })
  @JoinColumn({ name: 'modelId' })
  model: Model;

  @Column('int')
  modelId: number;

  // * Relacion con EngineType (Tipo de motor)
  @ManyToOne(() => EngineType, { nullable: false })
  @JoinColumn({ name: 'engineTypeId' })
  engineType: EngineType;

  @Column('int')
  engineTypeId: number;

  // * Relacion con Transmission (Tipo de transmisión)
  @ManyToOne(() => Transmission, { nullable: false })
  @JoinColumn({ name: 'transmissionId' })
  transmissionType: Transmission;

  @Column('int')
  transmissionId: number;

  // * Relacion InventoryState (Estado del inventario)

  @ManyToOne(() => InventoryState, { nullable: false })
  @JoinColumn({ name: 'inventoryStateId' })
  inventoryState: InventoryState;

  @Column('int', { default: 1 }) // Por default "En peritaje"
  inventoryStateId: number;

  @OneToOne(() => CarCosmeticInspection, (inspection) => inspection.car)
  cosmeticInspection: CarCosmeticInspection;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlug() {
    // Se usa numberPlate en lugar de id porque numberPlate sí existe antes de insertar
    const baseString = `${this.brand?.name || ''}-${this.model?.name || ''}-${this.year}-${this.numberPlate}`;

    this.slug = baseString
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remueve acentos (ej. Híbrido -> Hibrido)
      .replace(/[^a-z0-9 -]/g, '') // Remueve caracteres especiales
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-'); // Remueve guiones duplicados
  }
}
