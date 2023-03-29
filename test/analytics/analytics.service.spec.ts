import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../../src/modules/analytics/analytics.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../../src/modules/post/entities/post.entity';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: postRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
