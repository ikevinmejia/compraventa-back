import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('structural_conditions')
export class StructuralCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
