import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suspension_conditions')
export class SuspensionCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
