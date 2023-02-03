import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUserDto } from '../../src/modules/auth/dto/user-signup.dto';
import { UserService } from '../../src/modules/user/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const user = new SignUpUserDto();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'johndoe@test-atlas.com';
    user.username = 'johndoe';
    user.password = '123456789';
    user.confirmPassword = '123456789';
    user.phoneNumber = '00971555555555';
    user.address = 'Dubai, UAE';
    user.dateOfBirth = new Date('1990-01-01');

    expect(service.create(user)).toEqual(user);
  });
});
