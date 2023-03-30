import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Event } from './event.entity';
/**
 * Event clue entity
 */
@Entity()
export class EventClue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  date: Date;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  longitude: number;

  @ManyToOne(() => Event, (event) => event.clues, {
    onDelete: 'CASCADE'
  })
  event: Event;

  @ManyToOne(() => User, (user) => user.cluesCreated, {
    onDelete: 'CASCADE'
  })
  creator: User;
}
