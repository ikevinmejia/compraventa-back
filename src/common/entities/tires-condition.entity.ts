import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tires_conditions')
export class TiresCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
