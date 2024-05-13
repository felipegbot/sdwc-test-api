import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  url: string;

  @CreateDateColumn()
  created_at: Date;
}
