import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('engine_types')
export class EngineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
