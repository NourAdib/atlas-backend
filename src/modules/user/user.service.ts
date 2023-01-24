import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { BanStatus } from 'src/constants/ban-status.enum';
import { Role } from 'src/constants/role.enum';
import { Repository, UpdateResult } from 'typeorm';
import { SignUpUserDto } from '../auth/dto/user-signup.dto';
import { User } from './entities/user.entity';
import { Gender } from 'src/constants/gender.enum';
import { EncryptionService } from 'src/common/services/encryption.service';
import { FirebaseStorageService } from 'src/common/services/firebase-storage.service';
import { UpdateUserPasseordDto } from './dto/password-update.dto';
import { NotificationPreference } from 'src/constants/notification-preference.enum';
import { PageDto } from 'src/common/dto/page.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';

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

  async createUserWithImage(user: SignUpUserDto, image: any): Promise<User> {
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

    const savedUser = await this.usersRepository.save(newUser);

    const { imageId, url, expiryDate } = await new FirebaseStorageService().uploadAvatar(
      image.buffer,
      savedUser.id
    );

    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        profilePictureId: imageId,
        profilePictureUrl: url,
        profilePictureExpiryDate: new Date(expiryDate)
      })
      .where('id = :id', { id: savedUser.id })
      .execute();

    return this.usersRepository.findOneBy({ id: savedUser.id }).then((user) => {
      return user;
    });
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

  getUserProfileById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
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
    return this.usersRepository.findOneBy({ id: user.id });
  }

  /**
   * Updates the user role
   * @param user the user object that contains the userId
   * @param role the role to be updated to
   * @returns success or failure
   */
  async updateUserRole(user: any, role: Role): Promise<UpdateResult> {
    //Check if the role is valid
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    if (role === Role.Influencer) {
      const dbUser = await this.usersRepository.findOne({
        where: { id: user.id },
        relations: ['followers']
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      if (dbUser.followers.length < 2) {
        throw new BadRequestException('You need at least 2 followers to become an influencer');
      }
    }

    if (role === Role.Celebrity) {
      const dbUser = await this.usersRepository.findOne({
        where: { id: user.id },
        relations: ['followers']
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      if (dbUser.followers.length < 10) {
        throw new BadRequestException('You need at least 10 followers to become an celebrity');
      }
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
    return this.usersRepository.update(user.id, { email });
  }
  /**
   * Updates users address
   * @param user the user object that contains the userId
   * @param address the address to be updated to
   * @returns success or failure
   */
  updateUserAddress(user: any, address: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { address });
  }
  /**
   * updates the users First name
   * @param user the user object that contains the userId
   * @param firstName the first name to be updated to
   * @returns success or failure
   */
  updateUserFirstName(user: any, firstName: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { firstName });
  }
  /**
   * updates the users Last name
   * @param user the user object that contains the userId
   * @param lastName the last name to be updated to
   * @returns success or failure
   */
  updateUserLastName(user: any, lastName: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { lastName });
  }
  /**
   * updates the username
   * @param user the user object that contains the userId
   * @param username the username to be updated to
   * @returns success or failure
   */
  updateUsername(user: any, username: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { username });
  }
  /**
   * Updates users date of birth
   * @param user the user object that contains the userId
   * @param dateOfBirth the date of birth to be updated to
   * @returns success or failure
   */
  updateUserDateOfBirth(user: any, dateOfBirth: Date): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { dateOfBirth });
  }
  /**
   * Updates users phone number
   * @param user the user object that contains the userId
   * @param phoneNumber the phone number to be updated to
   * @returns success or failure
   */
  updateUserPhoneNumber(user: any, phoneNumber: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { phoneNumber });
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
  async updateUserPassword(user: any, body: UpdateUserPasseordDto): Promise<UpdateResult> {
    const dbUser = await this.usersRepository
      .createQueryBuilder()
      .select(['id', 'email', 'password', 'role'])
      .where('id = :id', { id: user.id })
      .getRawOne();

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await new EncryptionService().comparePasswords(
      body.currentPassword,
      dbUser.password
    );

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect current password');
    }

    const encryptedPassword = await new EncryptionService().encryptPassword(body.password);
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: encryptedPassword })
      .where('id = :id', { id: user.id })
      .execute();
  }

  /**
   * Checks if the user is banned
   * @param id the id of the user to be checked
   * @returns if the user is banned or not
   */
  async isUserBanned(id: string): Promise<boolean> {
    return this.usersRepository
      .findOne({
        where: { id: id },
        relations: ['bans'],
        order: { createdAt: 'DESC' }
      })
      .then((user) => {
        for (const ban of user.bans) {
          if (ban.status === BanStatus.Active) {
            return true;
          }
        }
      });
  }

  /**
   * Adds an avatar to the user
   * @param user the user object that contains the userId
   * @param avatar the avatar to be uploaded
   * @returns the result of the update
   */
  async addUserAvatar(user: any, avatar: any): Promise<UpdateResult> {
    const { imageId, url, expiryDate } = await new FirebaseStorageService().uploadAvatar(
      avatar.buffer,
      user.id
    );

    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        profilePictureExpiryDate: new Date(expiryDate),
        profilePictureId: imageId,
        profilePictureUrl: url
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  /**
   * Checks if the current link is valid and returns a new one if it is not
   * @param user the user object that contains the userId
   * @returns a signed url to the users avatar
   */
  async getUserAvatar(user: any) {
    const dbUser = await this.usersRepository.findOneBy({ id: user.id });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    if (!dbUser.profilePictureId || dbUser.profilePictureId.length === 0) {
      throw new HttpException('Invalid gender', HttpStatus.NO_CONTENT);
    }

    if (dbUser.profilePictureExpiryDate < new Date(Date.now())) {
      const { url, expiryDate } = await new FirebaseStorageService().getSignedURL(
        dbUser.id,
        dbUser.profilePictureId
      );

      this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({
          profilePictureExpiryDate: new Date(expiryDate),
          profilePictureUrl: url
        })
        .where('id = :id', { id: user.id })
        .execute();

      return url;
    }

    return dbUser.profilePictureUrl;
  }

  /**
   * Updates the users avatar
   * @param user the user object that contains the userId
   * @param avatar the avatar to be uploaded
   * @returns the result of the update
   */
  async updateUserAvatar(user: any, avatar: any) {
    const dbUser = await this.usersRepository.findOneBy({ id: user.id });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    if (!dbUser.profilePictureId || dbUser.profilePictureId.length === 0) {
      throw new HttpException("User doesn't have an avatar", HttpStatus.NO_CONTENT);
    }

    const { url, expiryDate } = await new FirebaseStorageService()
      .updateAvatar(avatar.buffer, dbUser.profilePictureId, dbUser.id)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        profilePictureExpiryDate: new Date(expiryDate),
        profilePictureUrl: url
      })
      .where('id = :id', { id: user.id })
      .execute();

    return dbUser.profilePictureUrl;
  }

  /**
   * Deletes the users avatar
   * @param user the user object that contains the userId
   * @returns the result of the update
   */
  async deleteUserAvatar(user: any): Promise<UpdateResult> {
    const dbUser = await this.usersRepository.findOneBy({ id: user.id });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    if (!dbUser.profilePictureId || dbUser.profilePictureId.length === 0) {
      throw new HttpException("User doesn't have an avatar", HttpStatus.NO_CONTENT);
    }

    await new FirebaseStorageService().deleteAvatar(dbUser.profilePictureId, dbUser.id);

    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        profilePictureExpiryDate: new Date(Date.now()),
        profilePictureId: '',
        profilePictureUrl: ''
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  async updateAvatarUrl(user: any, url: string, expiryDate: Date) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        profilePictureExpiryDate: new Date(expiryDate),
        profilePictureUrl: url
      })
      .where('id = :id', { id: user.id })
      .execute();
  }
  async updateUserNotificationPreferences(
    user: any,
    notificationPreference: NotificationPreference
  ): Promise<UpdateResult> {
    if (!Object.values(NotificationPreference).includes(notificationPreference)) {
      throw new BadRequestException('Invalid opiton');
    }
    return this.usersRepository.update(user.id, { notificationPreference });
  }

  async searchUsers(searchTerm: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryResults = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('User.username', pageOptionsDto.order)
      .getManyAndCount()
      .then((usersAndCount) => {
        return {
          items: usersAndCount[0],
          itemsCount: usersAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: User[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async deleteUser(user: any) {
    await this.usersRepository.delete(user.id);
  }
}
