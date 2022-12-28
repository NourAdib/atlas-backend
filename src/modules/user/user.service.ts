import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/constants/role.enum';
import { Repository, UpdateResult } from 'typeorm';
import { SignUpUserDto } from '../auth/dto/user-signup.dto';
import { User } from './user.entity';

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
      .where('id = :id', { id: user.userId })
      .execute();
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
      .where('id = :id', { id: user.userId })
      .execute();
  }
}
