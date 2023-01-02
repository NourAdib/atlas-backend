import { User } from 'src/modules/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  comment: string;

  //A comment can be made my one user but a user can have many comments
  @ManyToOne(() => User, (user) => user.commentedBy)
  author: User;

  //A comment can be in one post but a post can have many comments
  @ManyToOne(() => Post, (post) => post.commentPost)
  commentOnPost: Post;
}
