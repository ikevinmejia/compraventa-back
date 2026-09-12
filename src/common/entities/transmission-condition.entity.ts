import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transmission_conditions')
export class TransmissionCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
