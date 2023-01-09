import { LikeStatus } from 'src/constants/like-status.enum';
import { User } from 'src/modules/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: LikeStatus.Unliked })
  status: string;

  //A like can me made by one user but a user can have many likes
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  //A like can be in one post but post can have many likes
  @ManyToOne(() => Post, (post) => post.likePost)
  post: Post;
}
