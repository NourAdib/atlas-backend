import { BaseEntity } from '../../../common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/user.entity';
import { Visibility } from '../../../constants/visibility.enum';
import { Scrapbook } from './scrapbook.entity';
import { PostReport } from '../../report/entities/post-report.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
 */
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;

  @Column({ default: '' })
  imageUrl: string = '';

  @Column()
  tag: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  visibility: Visibility;

  @Column()
  isTakenDown: boolean;

  //A post can only be posted by one user but a user can have many posts
  @ManyToOne(() => User, (user) => user.posts)
  postedBy: User;

  //A user can be reported by many users
  @OneToMany(() => PostReport, (postReport) => postReport.reportedPost)
  reportsAgainst: PostReport[];

  //A post can only be part of one scrapbook but a scrapbook can have many posts
  @ManyToOne(() => Scrapbook, (scrapbook) => scrapbook.posts)
  scrapbook: Scrapbook;
}
