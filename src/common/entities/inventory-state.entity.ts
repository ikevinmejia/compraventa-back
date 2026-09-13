import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory_states')
export class InventoryState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
