import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('engine_types')
export class EngineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
