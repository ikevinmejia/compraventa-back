import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chassis_damages')
export class ChassisDamage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
