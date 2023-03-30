import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { FollowStatus } from '../../../constants/follow-status.enum';

/**
 * Follow request entity
 */
@Entity()
export class FollowRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: FollowStatus.Pending })
  status: FollowStatus = FollowStatus.Pending;

  //the user doing the following
  @ManyToOne(() => User, (user) => user.followRequestsSent, {
    onDelete: 'CASCADE'
  })
  requestedBy: User;

  //the user being followed
  @ManyToOne(() => User, (user) => user.followRequestsReceived, {
    onDelete: 'CASCADE'
  })
  requestedUser: User;
}
