import { BaseEntity } from '../../common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { EncryptionService } from '../../common/services/encryption.service';
import { Role } from '../../constants/role.enum';
import { Post } from '../post/entities/post.entity';
import { Scrapbook } from '../post/entities/scrapbook.entity';
import { PostReport } from '../report/entities/post-report.entity';
import { UserReport } from '../report/entities/user-report.entity';
import { UserComment } from '../post/entities/user-comment.entity';

/**
 * User Entity Class is the class that represents the User table in the database
 * This is how we interact with the database table in the application
 * No need for SQL quesries
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

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  role: Role;

  /* @OneToMany(() => User, (user) => user.followers) */

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

  //A user can comment on many posts
  @OneToMany(() => UserComment, (userComment) => userComment.author)
  commentedBy: UserComment[];

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
