import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/modules/user/user.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../src/constants/role.enum';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Follow } from '../../src/modules/follow/entities/follow.entity';
import { UserController } from '../../src/modules/user/user.controller';
import { createRequest, createResponse } from 'node-mocks-http';
import { UpdateResult } from 'typeorm';
import { UpdateUserEmailDto } from '../../src/modules/user/dto/email-update.dto';
import { UpdateUserDateOfBirthDto } from '../../src/modules/user/dto/dateofbirth-update.dto';
import { NotificationPreference } from '../../src/constants/notification-preference.enum';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
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
  updatedUser.role = Role.Influencer;

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
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserProfileById: jest.fn(),
            updateUserRole: jest.fn(),
            updateUserEmail: jest.fn(),
            updateUserAddress: jest.fn(),
            updateUserFirstName: jest.fn(),
            updateUserLastName: jest.fn(),
            updateUserPhoneNumber: jest.fn(),
            updateUserPassword: jest.fn(),
            updateUserDateOfBirth: jest.fn(),
            updateUsername: jest.fn(),
            updateUserBio: jest.fn(),
            updateUserGender: jest.fn(),
            updateUserNotificationPreferences: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should get profile by id', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'getUserProfileById').mockImplementation((id) => {
      return Promise.resolve(usersArray.find((user) => user.id === id));
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUserProfileById(req, res, userOneUuid);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(userOne);
    expect(res.json).not.toHaveBeenCalledWith(userTwo);
  });

  it('should not get profile by id', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'getUserProfileById').mockImplementation((id) => {
      return Promise.resolve(usersArray.find((user) => user.id === id));
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const testUuid = uuidv4();

    await controller.getUserProfileById(req, res, testUuid);

    //Expect that it returns a non of the users
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).not.toHaveBeenCalledWith(userOne);
    expect(res.json).not.toHaveBeenCalledWith(userTwo);
    expect(res.json).not.toHaveBeenCalledWith(userThree);
  });

  it('should update role', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserRole').mockImplementation((user, role) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserRole(req, res, Role.Influencer);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Role updated' });
  });

  it('should update email', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserEmail').mockImplementation((user, body) => {
      return Promise.resolve(new UpdateResult());
    });

    const dto = new UpdateUserEmailDto();
    dto.email = 'nour@atlas.com';

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserEmail(dto, req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email updated' });
  });

  it('should update address', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserAddress').mockImplementation((user, address) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserAddress('Lorem Ipsum', req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Address updated' });
  });

  it('should not update empty firstName', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserFirstName').mockImplementation((user, firstName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUserFirstName('', req, res);
    } catch (error) {
      expect(error).toEqual(new BadRequestException('First name must not be empty'));
    }
  });

  it('should not update overly long firstName', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserFirstName').mockImplementation((user, firstName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUserFirstName(
        'ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan',
        req,
        res
      );
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Name should be less than 256 characters'));
    }
  });

  it('should update firstName', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserFirstName').mockImplementation((user, firstName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserFirstName('Lorem Ipsum', req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'First name updated' });
  });

  it('should not update empty lastName', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserLastName').mockImplementation((user, lastName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUserLastName('', req, res);
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Last name must not be empty'));
    }
  });

  it('should not update overly long lastName', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserLastName').mockImplementation((user, lastName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUserLastName(
        'ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan',
        req,
        res
      );
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Name should be less than 256 characters'));
    }
  });

  it('should update lastname', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserLastName').mockImplementation((user, lastName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserLastName('Lorem Ipsum', req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Last name updated' });
  });

  it('should not update empty username', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUsername').mockImplementation((user, username) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUsername('', req, res);
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Username must not be empty'));
    }
  });

  it('should not update overly long username', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUsername').mockImplementation((user, lastName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    try {
      await controller.updateUsername(
        'ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan',
        req,
        res
      );
    } catch (error) {
      expect(error).toEqual(new BadRequestException('Username should be less than 30 characters'));
    }
  });

  it('should update username', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserLastName').mockImplementation((user, lastName) => {
      return Promise.resolve(new UpdateResult());
    });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserLastName('Lorem Ipsum', req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Last name updated' });
  });

  it('should update dateOfBirth', async () => {
    // Mock the getUserProfileById method
    jest.spyOn(service, 'updateUserDateOfBirth').mockImplementation((user, dob) => {
      return Promise.resolve(new UpdateResult());
    });

    const dto = new UpdateUserDateOfBirthDto();
    dto.dateOfBirth = new Date('2000-01-01');

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserDateOfBirth(dto, req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Date of birth updated' });
  });

  it('should update email', async () => {
    // Mock the getUserProfileById method
    jest
      .spyOn(service, 'updateUserNotificationPreferences')
      .mockImplementation((user, preference) => {
        return Promise.resolve(new UpdateResult());
      });

    const req = createRequest();
    const res = createResponse();

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.updateUserNotificationPreferences(req, res, NotificationPreference.Broadcast);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Notification preferences updated' });
  });
});
