import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chassis_damages')
export class ChassisDamage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
