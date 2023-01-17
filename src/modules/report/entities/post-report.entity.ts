import { Post } from '../../post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ReportStatus } from '../../../constants/report-status.enum';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ReportReason } from '../../../constants/report-reason.enum';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
 */
@Entity()
export class PostReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ReportStatus.PendingReview })
  status: string = ReportStatus.PendingReview;

  @Column()
  reason: ReportReason;

  //A Report can only report one post but a post can be in many reports
  @ManyToOne(() => Post, (post) => post.reportsAgainst, {
    onDelete: 'CASCADE'
  })
  reportedPost: Post;

  //A Report can only be posted by one user but a user can have many Reports
  @ManyToOne(() => User, (user) => user.reportedPosts)
  reportedBy: User;
}
