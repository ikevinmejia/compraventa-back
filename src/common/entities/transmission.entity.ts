import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transmissions')
export class Transmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
