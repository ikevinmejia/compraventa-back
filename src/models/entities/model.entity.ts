import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';

@Entity('models')
@Unique(['name', 'brandId'])
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.models, { nullable: false })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column('int')
  brandId: number;
}
