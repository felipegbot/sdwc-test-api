import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Visit } from '../visit/visit.entity';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => Visit, (visit) => visit.link)
  visits: Visit[];

  @CreateDateColumn()
  created_at: Date;
}
