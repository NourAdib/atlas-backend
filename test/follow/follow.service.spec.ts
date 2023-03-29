import { Test, TestingModule } from '@nestjs/testing';
import { FollowService } from '../../src/modules/follow/follow.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FollowRequest } from '../../src/modules/follow/entities/follow-request.entity';
import { Follow } from '../../src/modules/follow/entities/follow.entity';

describe('FollowService', () => {
  let service: FollowService;
  const userRepoToken = getRepositoryToken(User);
  const followRequestRepoToken = getRepositoryToken(FollowRequest);
  const followRepoToken = getRepositoryToken(Follow);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: followRequestRepoToken,
          useValue: {}
        },
        {
          provide: followRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<FollowService>(FollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
