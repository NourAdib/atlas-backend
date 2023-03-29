import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUserDto } from '../../src/modules/auth/dto/user-signup.dto';
import { UserService } from '../../src/modules/user/user.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../src/constants/role.enum';
import { ForbiddenException } from '@nestjs/common';
import { Follow } from '../../src/modules/follow/entities/follow.entity';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;
  const token = getRepositoryToken(User);
  let module: TestingModule;

  const userOneUuid = uuidv4();
  const userOne = new User();
  userOne.id = userOneUuid;
  userOne.firstName = 'John';
  userOne.lastName = 'Doe';
  userOne.email = 'johndoe@test.com';
  userOne.username = 'johndoe';
  userOne.password = 'password';
  userOne.phoneNumber = '1234567890';
  userOne.address = '123 Main St';
  userOne.dateOfBirth = new Date('1990-01-01');
  userOne.role = Role.Standard;

  const updatedUser = new User();
  updatedUser.id = userOneUuid;
  updatedUser.firstName = 'Mike';
  updatedUser.lastName = 'Doe';
  updatedUser.email = 'johndoeupdated@test.com';
  updatedUser.username = 'johndoe';
  updatedUser.password = 'password';
  updatedUser.phoneNumber = '1234567890';
  updatedUser.address = '123 Main St';
  updatedUser.dateOfBirth = new Date('1990-01-01');
  updatedUser.role = Role.Standard;

  const userTwo = new User();
  userTwo.id = uuidv4();
  userTwo.firstName = 'Jane';
  userTwo.lastName = 'Doe';
  userTwo.email = 'janedoe@test.com';
  userTwo.username = 'janedoe';
  userTwo.password = 'password';
  userTwo.phoneNumber = '1234567890';
  userTwo.address = '123 Main St';
  userTwo.dateOfBirth = new Date('1990-01-01');
  userTwo.role = Role.Standard;

  const userThree = new User();
  userThree.id = uuidv4();
  userThree.firstName = 'Jane';
  userThree.lastName = 'Doe';
  userThree.email = 'janedoe@test.com';
  userThree.username = 'janedoe';
  userThree.password = 'password';
  userThree.phoneNumber = '1234567890';
  userThree.address = '123 Main St';
  userThree.dateOfBirth = new Date('1990-01-01');
  userThree.role = Role.Standard;

  const sampleFollow = new Follow();
  sampleFollow.followedBy = new User();
  sampleFollow.followed = new User();

  userTwo.followers = [sampleFollow, sampleFollow];
  userThree.followers = [sampleFollow];

  const usersArray = [userOne, userTwo, userThree];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: token,
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            findOneBy: jest.fn((args) => {
              return usersArray.find((user) => user.email === args.email);
            }),
            findOne: jest.fn((args) => {
              return usersArray.find((user) => user.id === args.where.id);
            }),
            save: jest.fn((dto) => {
              const user = new User();
              user.id = userOneUuid;
              user.firstName = dto.firstName;
              user.lastName = dto.lastName;
              user.email = dto.email;
              user.username = dto.username;
              user.password = dto.password;
              user.phoneNumber = dto.phoneNumber;
              user.address = dto.address;
              user.dateOfBirth = dto.dateOfBirth;
              user.role = Role.Standard;
              return user;
            }),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(updatedUser)
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = new SignUpUserDto();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'johndoe@test.com';
    user.username = 'johndoe';
    user.password = 'password';
    user.phoneNumber = '1234567890';
    user.address = '123 Main St';
    user.dateOfBirth = new Date('1990-01-01');

    const returnedUser = await service.create(user);

    expect(returnedUser).toEqual(userOne);
  });

  it('created user should match inputted data', async () => {
    const user = new SignUpUserDto();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'johndoe@test.com';
    user.username = 'johndoe';
    user.password = 'password';
    user.phoneNumber = '1234567890';
    user.address = '123 Main St';
    user.dateOfBirth = new Date('1990-01-01');

    const returnedUser = await service.create(user);

    expect(returnedUser).not.toEqual(userTwo);
  });

  it('created user should start as standard user', async () => {
    const user = new SignUpUserDto();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'johndoe@test.com';
    user.username = 'johndoe';
    user.password = 'password';
    user.phoneNumber = '1234567890';
    user.address = '123 Main St';
    user.dateOfBirth = new Date('1990-01-01');

    const returnedUser = await service.create(user);

    expect(returnedUser.role).toEqual(Role.Standard);
  });

  it('should find user by email', async () => {
    const returnedUser = await service.findOneByEmail('johndoe@test.com');

    expect(returnedUser).toEqual(userOne);
  });

  it('should not update user role to admin', async () => {
    try {
      await service.updateUserRole(userThree, Role.Admin);
    } catch (error) {
      expect(error).toEqual(
        new ForbiddenException('You are not authorized to perform this action')
      );
    }
  });

  it('should not update user role to influencer', async () => {
    try {
      await service.updateUserRole(userThree, Role.Influencer);
    } catch (error) {
      expect(error).toEqual(
        new ForbiddenException('You need at least 2 followers to become an influencer')
      );
    }
  });

  it('should not update user role to celebrity', async () => {
    try {
      await service.updateUserRole(userThree, Role.Celebrity);
    } catch (error) {
      expect(error).toEqual(
        new ForbiddenException('You need at least 10 followers to become an celebrity')
      );
    }
  });

  it('should update user email', async () => {
    const returnedUser = await service.updateUserEmail(userOne, 'johndoeupdated@test.com');

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user bio', async () => {
    const returnedUser = await service.updatedUserBio(
      userOne,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    );

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user address', async () => {
    const returnedUser = await service.updateUserAddress(userOne, '123 Main St');

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user first name', async () => {
    const returnedUser = await service.updateUserFirstName(userOne, 'Jane');

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user last name', async () => {
    const returnedUser = await service.updateUserLastName(userOne, 'Adib');

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user username', async () => {
    const returnedUser = await service.updateUsername(userOne, 'johndoeupdated');

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user dob', async () => {
    const returnedUser = await service.updateUserDateOfBirth(userOne, new Date('1990-01-01'));

    expect(returnedUser).not.toEqual(userOne);
  });

  it('should update user phone number', async () => {
    const returnedUser = await service.updateUserPhoneNumber(userOne, '00971550000000');

    expect(returnedUser).not.toEqual(userOne);
  });
});
