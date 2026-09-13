import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adjustment_types')
export class AdjustmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
