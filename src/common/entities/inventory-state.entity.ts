import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory_states')
export class InventoryState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
