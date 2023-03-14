import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Event } from './event.entity';

@Entity()
export class EventGoal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  longitude: number;

  @OneToOne(() => Event, (event) => event.goal, {
    onDelete: 'CASCADE'
  })
  event: Event;

  @ManyToOne(() => User, (user) => user.goalsCreated, {
    onDelete: 'CASCADE'
  })
  creator: User;
}
