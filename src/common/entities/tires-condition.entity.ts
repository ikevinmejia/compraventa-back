import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tires_conditions')
export class TiresCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
