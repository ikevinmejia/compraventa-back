import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('structural_conditions')
export class StructuralCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
