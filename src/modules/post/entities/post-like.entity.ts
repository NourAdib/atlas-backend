import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

/**
 * Like entity
 */
@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE'
  })
  likedPost: Post;

  //A like can only be liked by one user but a user can have many likes
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE'
  })
  likedBy: User;
}
