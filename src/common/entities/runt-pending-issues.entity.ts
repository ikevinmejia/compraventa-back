import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('runt_pending_issues')
export class RuntPendingIssues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
