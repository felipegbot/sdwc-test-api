import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Link } from '../link/link.entity';

@Unique(['date', 'link_id'])
@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date', default: new Date() })
  date: Date;

  @Column()
  link_id: string;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => Link, (link) => link.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'link_id' })
  link: Link;
}
