import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('text', {
    unique: true,
  })
  plate: string;

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

  @Exclude()
  @Column('int')
  brandId: number;

  // * Relacion Model (Modelo)

  @ManyToOne(() => Model, { nullable: false })
  @JoinColumn({ name: 'modelId' })
  model: Model;

  @Exclude()
  @Column('int')
  modelId: number;

  // * Relacion con EngineType (Tipo de motor)
  @ManyToOne(() => EngineType, { nullable: false })
  @JoinColumn({ name: 'engineTypeId' })
  engineType: EngineType;

  @Exclude()
  @Column('int')
  engineTypeId: number;

  // * Relacion con Transmission (Tipo de transmisión)
  @ManyToOne(() => Transmission, { nullable: false })
  @JoinColumn({ name: 'transmissionId' })
  transmissionType: Transmission;

  @Exclude()
  @Column('int')
  transmissionId: number;

  // * Relacion InventoryState (Estado del inventario)

  @ManyToOne(() => InventoryState, { nullable: false })
  @JoinColumn({ name: 'inventoryStateId' })
  inventoryState: InventoryState;

  @Exclude()
  @Column('int', { default: 1 }) // Por default "En peritaje"
  inventoryStateId: number;

  @OneToOne(() => CarCosmeticInspection, (inspection) => inspection.car)
  cosmeticInspection: CarCosmeticInspection;

  // @BeforeInsert()
  // @BeforeUpdate()
}
