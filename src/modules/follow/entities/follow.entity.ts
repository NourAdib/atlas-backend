import { BaseEntity } from '../../../common/entities/base.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //the user doing the following
  @ManyToOne(() => User, (user) => user.following)
  followedBy: User;

  //the user being followed
  @ManyToOne(() => User, (user) => user.followers)
  followed: User;
}
