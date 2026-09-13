import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity('municipalities')
@Unique(['name', 'departmentId'])
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  // * Relacion Departamento
  @ManyToOne(() => Department, (dep) => dep.municipalities, {
    nullable: false,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column('int', { select: false })
  departmentId: number;
}
