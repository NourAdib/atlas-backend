import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';
import { ReportStatus } from '../../../constants/report-status.enum';
import { ReportReason } from '../../../constants/report-reason.enum';

/**
 * Appeal entity
 */
@Entity()
export class Appeal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ReportStatus.PendingReview })
  status: string = ReportStatus.PendingReview;

  @Column()
  reportReason: ReportReason;

  @Column()
  text: string;

  //An appeal can only appeal one post but a post can be in many appeals
  @ManyToOne(() => Post, (post) => post.appeals, {
    onDelete: 'CASCADE'
  })
  appealedPost: Post;

  //A appeal can only be appeal by one user but a user can have many appeal
  @ManyToOne(() => User, (user) => user.appeals, {
    onDelete: 'CASCADE'
  })
  appealedBy: User;
}
