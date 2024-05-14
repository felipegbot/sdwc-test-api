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

  @OneToMany(() => Visit, (visit) => visit.link, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  visits: Visit[];

  @CreateDateColumn({ select: false })
  created_at: Date;
}
