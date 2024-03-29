import { BaseEntity } from '../../../common/entities/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { EncryptionService } from '../../../common/services/encryption.service';
import { Role } from '../../../constants/role.enum';
import { Post } from '../../post/entities/post.entity';
import { Scrapbook } from '../../post/entities/scrapbook.entity';
import { Comment } from '../../post/entities/comment.entity';
import { PostReport } from '../../report/entities/post-report.entity';
import { UserReport } from '../../report/entities/user-report.entity';
import { Gender } from '../../../constants/gender.enum';
import { UserBan } from '../../report/entities/user-ban.entity';
import { Appeal } from '../../appeals/entities/appeal.entity';
import { Block } from '../../block/entities/block.entity';
import { Follow } from '../../../modules/follow/entities/follow.entity';
import { FollowRequest } from '../../../modules/follow/entities/follow-request.entity';
import { NotificationPreference } from '../../../constants/notification-preference.enum';
import { Like } from '../../post/entities/post-like.entity';
import { SubscriptionPlan } from '../../../constants/subscription-plan.enum';
import { Memory } from '../../memory/entities/memory.entity';
import { Event } from '../../../modules/event/entities/event.entity';
import { EventClue } from '../../../modules/event/entities/eventClues.entity';
import { EventGoal } from '../../../modules/event/entities/eventGoal.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL queries
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ default: '' })
  address: string = '';

  @Column()
  dateOfBirth: Date;

  @Column()
  role: Role;

  @Column({ type: 'longtext' })
  profilePictureUrl: string = '';

  @Column({ default: '' })
  profilePictureId: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  profilePictureExpiryDate: Date;

  @Column({ default: Gender.Undefined })
  gender: Gender = Gender.Undefined;

  @Column({ default: '' })
  fcmToken: string = '';

  @Column({ default: NotificationPreference.All })
  notificationPreference: NotificationPreference = NotificationPreference.All;

  @Column({ default: false })
  isBanned: boolean = false;

  @Column({ default: false })
  hasStripAccount: boolean = false;

  @Column({ default: '' })
  stripeCustomerId: string = '';

  @Column({ default: SubscriptionPlan.Basic })
  subscriptionPlan: SubscriptionPlan = SubscriptionPlan.Basic;

  @Column({ default: 0 })
  followersCount: number = 0;

  @Column({ default: 0 })
  followingCount: number = 0;

  @Column({ default: '' })
  bio: string = '';

  //A user can have many posts
  @OneToMany(() => Post, (post) => post.postedBy)
  posts: Post[];

  //A user can have many posts
  @OneToMany(() => Scrapbook, (scrapbook) => scrapbook.user)
  scrapbooks: Scrapbook[];

  //A user can report many posts
  @OneToMany(() => PostReport, (postReport) => postReport.reportedBy)
  reportedPosts: PostReport[];

  //A user can report many users
  @OneToMany(() => UserReport, (userReport) => userReport.reportedBy)
  reportedUsers: UserReport[];

  //A user can be reported by many users
  @OneToMany(() => UserReport, (userReport) => userReport.reportedUser)
  reportsAgainst: UserReport[];

  @OneToMany(() => UserBan, (userBan) => userBan.bannedUser)
  bans: UserBan[];

  //A user can make many comments
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  //A user can make many appeals
  @OneToMany(() => Appeal, (appeal) => appeal.appealedBy)
  appeals: Appeal[];

  //A user can block many users
  @OneToMany(() => Block, (block) => block.blockingUser)
  blocks: Block[];

  //A user can be blocked by many users
  @OneToMany(() => Block, (block) => block.blockedUser)
  blockedBy: Block[];

  //A user can follow many users
  @OneToMany(() => Follow, (follow) => follow.followedBy)
  following: Follow[];

  //A user can be followed by many users
  @OneToMany(() => Follow, (follow) => follow.followed)
  followers: Follow[];

  //A user can send many follow requests
  @OneToMany(() => FollowRequest, (followRequest) => followRequest.requestedBy)
  followRequestsSent: FollowRequest[];

  //A user can receive many follow requests
  @OneToMany(() => FollowRequest, (followRequest) => followRequest.requestedUser)
  followRequestsReceived: FollowRequest[];

  //A user can have many likes
  @OneToMany(() => Like, (like) => like.likedBy)
  likes: Like[];

  //A user can make many memories
  @OneToMany(() => Memory, (memory) => memory.user)
  memories: Memory[];

  //A user can make many events
  @OneToMany(() => Event, (event) => event.creator)
  eventsCreated: Event[];

  //A user can attend many events
  @ManyToMany(() => Event, (event) => event.participants)
  eventsAttended: Event[];

  //A user can make many clues
  @OneToMany(() => EventClue, (clue) => clue.creator)
  cluesCreated: EventClue[];

  //A user can make many goals
  @OneToMany(() => EventGoal, (goal) => goal.creator)
  goalsCreated: EventGoal[];

  //This is a hook that will be executed before the user is inserted in the database
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await new EncryptionService().encryptPassword(this.password);
  }
}
