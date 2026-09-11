import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rims_types')
export class RimsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
