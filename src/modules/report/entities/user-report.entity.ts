import { ReportStatus } from '../../../constants/report-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '../../user/user.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
 */
@Entity()
export class UserReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ReportStatus.PendingReview })
  status: string = ReportStatus.PendingReview;

  @Column()
  reason: string;

  //A Report can only report one user but a user can be in many reports
  @ManyToOne(() => User, (user) => user.reportsAgainst)
  reportedUser: User;

  //A Report can only be posted by one user but a user can have many Reports
  @ManyToOne(() => User, (user) => user.reportedUsers)
  reportedBy: User;
}
