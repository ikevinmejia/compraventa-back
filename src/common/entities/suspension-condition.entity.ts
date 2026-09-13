import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suspension_conditions')
export class SuspensionCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
