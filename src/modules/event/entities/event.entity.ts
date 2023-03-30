import { BaseEntity } from '../../../common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Visibility } from '../../../constants/visibility.enum';
import { EventClue } from './eventClues.entity';
import { EventGoal } from './eventGoal.entity';
/**
 * Event entity
 */
@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  numberOfParticipants: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  longitude: number;

  @Column()
  visibility: Visibility;

  @Column()
  date: Date;

  @OneToMany(() => EventClue, (eventClue) => eventClue.event)
  clues: EventClue[];

  @OneToOne(() => EventGoal, (goal) => goal.event)
  @JoinColumn()
  goal: EventGoal;

  @ManyToOne(() => User, (user) => user.eventsCreated)
  creator: User;

  @ManyToMany(() => User, (user) => user.eventsAttended)
  @JoinTable()
  participants: User[];
}
