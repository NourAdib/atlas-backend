import { ReportStatus } from '../../../constants/report-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ReportReason } from '../../../constants/report-reason.enum';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL queries
 */
@Entity()
export class UserReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ReportStatus.PendingReview })
  status: string = ReportStatus.PendingReview;

  @Column()
  reason: ReportReason;

  //A Report can only report one user but a user can be in many reports
  @ManyToOne(() => User, (user) => user.reportsAgainst, {
    onDelete: 'CASCADE'
  })
  reportedUser: User;

  //A Report can only be posted by one user but a user can have many Reports
  @ManyToOne(() => User, (user) => user.reportedUsers, {
    onDelete: 'CASCADE'
  })
  reportedBy: User;
}
