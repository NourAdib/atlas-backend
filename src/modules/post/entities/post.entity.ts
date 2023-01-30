import { BaseEntity } from '../../../common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterLoad } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Visibility } from '../../../constants/visibility.enum';
import { Scrapbook } from './scrapbook.entity';
import { Like } from './post-like.entity';
import { Comment } from './comment.entity';
import { PostReport } from '../../report/entities/post-report.entity';
import { FirebaseStorageService } from '../../../common/services/firebase-storage.service';
import { Appeal } from '../../appeals/entities/appeal.entity';

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

  @Column()
  tag: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  visibility: Visibility;

  @Column({ default: false })
  isTakenDown: boolean = false;

  @Column({ type: 'longtext' })
  imageUrl: string = '';

  @Column({ default: '' })
  imageId: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  imageExpiryDate: Date;

  @Column({ default: 0 })
  likesCount: number = 0;

  //A post can only be posted by one user but a user can have many posts
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE'
  })
  postedBy: User;

  //A user can be reported by many users
  @OneToMany(() => PostReport, (postReport) => postReport.reportedPost)
  reportsAgainst: PostReport[];

  //A post can only be part of one scrapbook but a scrapbook can have many posts
  @ManyToOne(() => Scrapbook, (scrapbook) => scrapbook.posts)
  scrapbook: Scrapbook;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  //A post can have many appeals
  @OneToMany(() => Appeal, (appeal) => appeal.appealedPost)
  appeals: Appeal[];

  //A post can have many likes
  @OneToMany(() => Like, (like) => like.likedPost)
  likes: Like[];
}
