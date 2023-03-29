import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppealsService } from '../../src/modules/appeals/appeals.service';
import { Appeal } from '../../src/modules/appeals/entities/appeal.entity';
import { Post } from '../../src/modules/post/entities/post.entity';
import { PostReport } from '../../src/modules/report/entities/post-report.entity';

describe('AppealsService', () => {
  let service: AppealsService;
  const appealsRepoToken = getRepositoryToken(Appeal);
  const postReportRepoToken = getRepositoryToken(PostReport);
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AppealsService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: postReportRepoToken,
          useValue: {}
        },
        {
          provide: postRepoToken,
          useValue: {}
        },
        {
          provide: appealsRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<AppealsService>(AppealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
