import { BaseEntity } from '../../../common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Visibility } from '../../../constants/visibility.enum';
import { Post } from './post.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
 */
@Entity()
export class Scrapbook extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;

  @Column()
  location: string;

  @Column()
  visibility: Visibility;

  //A scrapbook can only be posted by one user but a user can have many scrapbook
  @ManyToOne(() => User, (user) => user.scrapbooks)
  user: User;

  //A scrapbook can have many posts
  @OneToMany(() => Post, (post) => post.scrapbook)
  posts: Post[];
}
