import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';

@Entity('car_images')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Car, (car) => car.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column('uuid')
  carId: string;

  @Column('text')
  url: string;

  @Column('text')
  publicId: string;

  @Column('int', { default: 0 })
  displayOrder: number; // para controlar el orden de aparición en la galería

  @Column('boolean', { default: false })
  isCover: boolean; // marca cuál es la foto de portada/miniatura

  @CreateDateColumn()
  createdAt: Date;
}
