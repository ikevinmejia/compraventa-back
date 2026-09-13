import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rims_types')
export class RimsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
