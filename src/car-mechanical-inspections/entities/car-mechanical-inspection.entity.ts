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
  SuspensionCondition,
  TransmissionCondition,
} from '../../common/entities/';

@Entity('car_mechanical_inspections')
export class CarMechanicalInspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Car, (car) => car.mechanicalInspection, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column('uuid')
  carId: string;

  @Column('boolean', { default: false })
  hasEngineLeaks: boolean; // Tiene fugas el motor

  @Column('varchar', { length: 3000, nullable: true })
  engineLeaksDetail?: string; // Detalle de fugaz

  @ManyToOne(() => TransmissionCondition)
  @JoinColumn({ name: 'transmissionConditionId' })
  transmissionCondition: TransmissionCondition; // Condición de la transmisión

  @Column('int')
  transmissionConditionId: number;

  @ManyToOne(() => SuspensionCondition)
  @JoinColumn({ name: 'suspensionConditionId' })
  suspensionCondition: SuspensionCondition; // Estado de la suspensión

  @Column('int')
  suspensionConditionId: number;

  @Column('varchar', { length: 3000, nullable: true })
  additionalMechanicalObservations?: string; // Observaciones
}
