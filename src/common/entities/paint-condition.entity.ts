import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paint_conditions')
export class PaintCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
