import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BanStatus } from '../../../constants/ban-status.enum';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
 */
@Entity()
export class UserBan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: BanStatus.Active })
  status: string = BanStatus.Active;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  //A user can be banned multiple times
  @ManyToOne(() => User, (user) => user.bans)
  bannedUser: User;
}
