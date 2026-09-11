import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import {
  AdjustmentType,
  ChassisDamage,
  PaintCondition,
  RimsType,
  StructuralCondition,
  TiresCondition,
} from '../../common/entities/';
import { WindowsCheckDto } from '../dto/create-car-cosmetic-inspection.dto';

@Entity('car_cosmetic_inspections')
export class CarCosmeticInspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Car, (car) => car.cosmeticInspection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column('uuid')
  carId: string;

  @Column('boolean', { default: false })
  electricWindowsFunctional: boolean;

  @Column('jsonb', { nullable: true })
  windowsCheckByDoor: WindowsCheckDto;

  @ManyToOne(() => RimsType)
  @JoinColumn({ name: 'rimsTypeId' })
  rimsType: RimsType;

  @Column('int')
  rimsTypeId: number;

  @ManyToOne(() => TiresCondition)
  @JoinColumn({ name: 'tiresConditionId' })
  tiresCondition: TiresCondition; // Estado de las llantas

  @Column('int')
  tiresConditionId: number;

  @ManyToOne(() => AdjustmentType)
  @JoinColumn({ name: 'steeringColumnAdjustmentId' })
  steeringColumnAdjustment: AdjustmentType; // Ajuste de la cabrilla

  @Column('int')
  steeringColumnAdjustmentId: number;

  @ManyToOne(() => AdjustmentType)
  @JoinColumn({ name: 'mirrorsTypeId' })
  mirrorsType: AdjustmentType; // Vidrios manuales o electricos

  @Column('int')
  mirrorsTypeId: number;

  @Column('boolean', { default: true })
  mirrorsFunctional: boolean;

  @ManyToOne(() => PaintCondition)
  @JoinColumn({ name: 'paintConditionId' })
  paintCondition: PaintCondition; // Vidrios manuales o electricos

  @Column('int')
  paintConditionId: number;

  @Column('boolean', { default: false })
  hoodDents: boolean; // Capó presenta golpes?

  @ManyToOne(() => ChassisDamage)
  @JoinColumn({ name: 'chassisFrontDamageId' })
  chassisFrontDamage: ChassisDamage;

  @Column('int')
  chassisFrontDamageId: number;

  @JoinColumn({ name: 'driverDoorPillarId' })
  driverDoorPillar: StructuralCondition;

  @Column('int')
  driverDoorPillarId: number;

  @ManyToOne(() => StructuralCondition)
  @JoinColumn({ name: 'passengerDoorPillarId' })
  passengerDoorPillar: StructuralCondition;

  @Column('int')
  passengerDoorPillarId: number;

  @Column('boolean', { default: true })
  doorsOpenProperly: boolean; // puertas abren bien?

  @ManyToOne(() => StructuralCondition)
  @JoinColumn({ name: 'trunkStructureId' })
  trunkStructure: number; // estructura del maletero

  @Column('int')
  trunkStructureId: number;

  @ManyToOne(() => StructuralCondition)
  @JoinColumn({ name: 'trunkFloorId' })
  trunkFloor: number; // Estructura del piso del maletero

  @Column('int')
  trunkFloorId: number;

  @Column('boolean', { default: false })
  trunkHasRust: boolean; // Maletero tiene podridos?

  @Column('boolean', { default: true })
  hasSpareTire: boolean; // Llanta de repuesto

  @Column('varchar', { default: '', length: 3000 })
  additionalObservations?: string; // Observaciones
}
