import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adjustment_types')
export class AdjustmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
