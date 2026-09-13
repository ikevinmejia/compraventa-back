import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipality } from '../../municipalities/entities/municipality.entity';
@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  // * Relacion Municipio

  @OneToMany(() => Municipality, (municipality) => municipality.department)
  municipalities: Municipality[];
}
