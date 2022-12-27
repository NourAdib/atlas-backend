import { BaseEntity } from '../../common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { EncryptionService } from '../../common/services/encryption.service';
import { Role } from '../../constants/role.enum';
import { Post } from '../post/post.entity';

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
