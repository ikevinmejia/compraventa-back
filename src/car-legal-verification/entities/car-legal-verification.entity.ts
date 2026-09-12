import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { InsuranceClaimType, RuntPendingIssues } from '../../common/entities';

@Entity('car_legal_verifications')
export class CarLegalVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Car, (car) => car.legalVerification, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column('text')
  carId: string;

  @Column('varchar', { length: 100 })
  registrationCity: string; // municipio de matricula

  @Column('date')
  soatExpirationDate: Date; // vigencia de soat

  @Column('date')
  technicalInspectionExpirationDate: Date; // vigencia tecnomecanica

  @Column('boolean', { default: false })
  hasTrafficFines: boolean; // Tiene fotomultas?

  @Column('int')
  trafficFinesCount: number; // Cantidad de multas

  @Column('decimal', {
    precision: 12,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value), // convierte el string que devuelve pg a number
    },
  })
  trafficFinesTotalAmount: number; // Total en dinero de multas

  @Column('boolean', { default: false })
  taxesUpToDate: boolean; // Impuestos al día si o no

  @Column('int', { default: 0 })
  taxesOwedYears: number; // Años de deuda de impuestos

  @Column('boolean', { default: true })
  runtMatchesLicense: boolean; // Coincide la licencia con el runt?

  @Column('boolean', { default: false })
  runtHasLiens: boolean; // Tiene gravamenes?

  @ManyToOne(() => RuntPendingIssues)
  @JoinColumn({ name: 'runtPendingIssueId' })
  runtPendingIssues: RuntPendingIssues;

  @Column('int')
  runtPendingIssueId: number;

  @Column('boolean', { default: true })
  municipalTrafficLightTaxUpToDate: boolean; // Esta al día impuesto municipal - semaforización

  @Column('boolean', { default: false })
  hadPublicServiceUse: boolean; // Tuvo uso público?

  @Column('boolean', { default: false })
  hasInsuranceClaims: boolean; // Tiene siniestros?

  @ManyToOne(() => InsuranceClaimType)
  @JoinColumn({ name: 'insuranceClaimTypeId' })
  insuranceClaimType: InsuranceClaimType;

  @Column('int')
  insuranceClaimTypeId: number;
}
