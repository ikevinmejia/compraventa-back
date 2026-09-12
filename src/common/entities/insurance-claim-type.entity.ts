import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('insurance_claim_types')
export class InsuranceClaimType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
