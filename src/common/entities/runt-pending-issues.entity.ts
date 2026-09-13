import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('runt_pending_issues')
export class RuntPendingIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;
}
