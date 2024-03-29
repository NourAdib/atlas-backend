import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../src/modules/notification/notification.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('NotificationService', () => {
  let service: NotificationService;
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: userRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
