import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transmissions')
export class Transmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
