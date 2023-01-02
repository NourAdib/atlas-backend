import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/constants/role.enum';
import { Repository, UpdateResult } from 'typeorm';
import { SignUpUserDto } from '../auth/dto/user-signup.dto';
import { User } from './user.entity';
import { threadId } from 'worker_threads';
import { Gender } from 'src/constants/gender.enum';
import { EncryptionService } from 'src/common/services/encryption.service';

@Injectable()
export class UserService {
  /**
   * We use the repository to interact with the database
   * @param usersRepository the user repository that will be injected by the nestjs
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /**
   * Creates a new user object and saves it in the database
   * @param user the user object that contains the user information
   * @returns the newly created user
   */
  create(user: SignUpUserDto): Promise<User> {
    const newUser = new User();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.phoneNumber = user.phoneNumber;
    newUser.address = user.address;
    newUser.dateOfBirth = new Date(user.dateOfBirth);

    //The user is a normal user by default
    newUser.role = Role.Standard;

    console.log(newUser);

    return this.usersRepository.save(newUser);
  }
  /**
   * Creates a new user object and saves it in the database
   * @param user the user object that contains the user information
   * @returns the newly created user
   */
  createAdmin(user: SignUpUserDto): Promise<User> {
    const newUser = new User();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.phoneNumber = user.phoneNumber;
    newUser.address = user.address;
    newUser.dateOfBirth = new Date(user.dateOfBirth);

    //The user is an admin
    newUser.role = Role.Admin;
    return this.usersRepository.save(newUser);
  }
  /**
   * Gets the user with the email passed in the parameter
   * @param email the email of the user
   * @returns the user with the email passed in the parameter
   */
  findOneByEmail(email: string): Promise<User> {
    //Look in the users table for one user with the email as the email passed in the parameter
    return this.usersRepository.findOneBy({ email });
  }

  /**
   * Gets the user profile using the JWT token
   * @param user the user object that contains the userId
   * @returns the user profile
   */
  getUserProfile(user: any): Promise<User> {
    return this.usersRepository
      .createQueryBuilder()
      .select([
        'id',
        'firstName',
        'lastName',
        'email',
        'username',
        'role',
        'phoneNumber',
        'address',
        'dateOfBirth'
      ])
      .where('id = :id', { id: user.id })
      .getRawOne();
  }

  /**
   * Updates the user role
   * @param user the user object that contains the userId
   * @param role the role to be updated to
   * @returns success or failure
   */
  updateUserRole(user: any, role: Role): Promise<UpdateResult> {
    //Check if the role is valid
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    //Check if the user is an admin
    if (user.role !== Role.Admin && role === Role.Admin) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }

    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ role })
      .where('id = :id', { id: user.id })
      .execute();
  }
  /**
   * Updates users email address
   * @param user the user object that contains the userId
   * @param email the email to be updated to
   * @returns success or failure
   */
  updateUserEmail(user: any, email: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ email })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * Updates users address
   * @param user the user object that contains the userId
   * @param address the address to be updated to
   * @returns success or failure
   */
  updateUserAddress(user: any, address: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ address })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * updates the users First name
   * @param user the user object that contains the userId
   * @param firstName the first name to be updated to
   * @returns success or failure
   */
  updateUserFirstName(user: any, firstName: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ firstName })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * updates the users Last name
   * @param user the user object that contains the userId
   * @param lastName the last name to be updated to
   * @returns success or failure
   */
  updateUserLastName(user: any, lastName: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ lastName })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * updates the username
   * @param user the user object that contains the userId
   * @param username the username to be updated to
   * @returns success or failure
   */
  updateUsername(user: any, username: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * Updates users date of birth
   * @param user the user object that contains the userId
   * @param dateOfBirth the date of birth to be updated to
   * @returns success or failure
   */
  updateUserDateOfBirth(user: any, dateOfBirth: Date): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ dateOfBirth })
      .where('id = id', { id: user.id })
      .execute();
  }
  /**
   * Updates users phone number
   * @param user the user object that contains the userId
   * @param phoneNumber the phone number to be updated to
   * @returns success or failure
   */
  updateUserPhoneNumber(user: any, phoneNumber: string): Promise<UpdateResult> {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ phoneNumber })
      .where('id = id', { id: user.id })
      .execute();
  }

  /**
   * Updates the user gender
   * @param user the user object that contains the userId
   * @param gender the gender to be updated to
   * @returns success or failure
   */
  updateUserGender(user: any, gender: Gender): Promise<UpdateResult> {
    //Check if the gender is valid
    if (!Object.values(Gender).includes(gender)) {
      throw new BadRequestException('Invalid gender');
    }

    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ gender })
      .where('id = :id', { id: user.id })
      .execute();
  }
  /**
   * updates the user password
   * @param user user the user object that contains the userId
   * @param password the password to be updated to
   * @returns success or failure
   */
  async updateUserPassword(user: any, password: string): Promise<UpdateResult> {
    const encryptPassword = await new EncryptionService().encryptPassword(password);
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: encryptPassword })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
