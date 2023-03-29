import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from '../../src/modules/feed/feed.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../../src/modules/post/entities/post.entity';

describe('FeedService', () => {
  let service: FeedService;
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
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

    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
