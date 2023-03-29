import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from '../../src/modules/report/report.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../../src/modules/post/entities/post.entity';
import { PostReport } from '../../src/modules/report/entities/post-report.entity';
import { UserReport } from '../../src//modules/report/entities/user-report.entity';
import { UserBan } from '../../src/modules/report/entities/user-ban.entity';

describe('ReportService', () => {
  let service: ReportService;
  const userReportRepoToken = getRepositoryToken(UserReport);
  const postReportRepoToken = getRepositoryToken(PostReport);
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);
  const userBanRepoToken = getRepositoryToken(UserBan);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
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
          provide: userReportRepoToken,
          useValue: {}
        },
        {
          provide: userBanRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
