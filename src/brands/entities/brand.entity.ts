import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Model } from '../../models/entities/model.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  // * Relacion Model (Modelo)

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
