import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * Comment entity
 */
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  //A comment can be made my one user but a user can have many comments
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE'
  })
  author: User;

  //A comment can be in one post but a post can have many comments
  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE'
  })
  post: Post;
}
