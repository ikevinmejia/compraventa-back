import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  // * Relacion Municipio

  @OneToMany(() => Municipio, (municipio) => municipio.departamento)
  municipios: Municipio[];
}

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  // * Relacion Departamento
  @ManyToOne(() => Departamento, (Departamento) => Departamento.municipios, {
    nullable: false,
  })
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @Column('int')
  departamentoId: number;
}
