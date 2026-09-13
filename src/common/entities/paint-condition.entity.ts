import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paint_conditions')
export class PaintCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
