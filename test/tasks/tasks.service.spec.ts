import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../src/modules/tasks/tasks.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBan } from '../../src/modules/report/entities/user-ban.entity';
import { Post } from '../../src/modules/post/entities/post.entity';
import { PostReport } from '../../src/modules/report/entities/post-report.entity';
import { Memory } from '../../src/modules/memory/entities/memory.entity';

describe('TasksService', () => {
  let service: TasksService;
  const memoryRepoToken = getRepositoryToken(Memory);
  const postReportRepoToken = getRepositoryToken(PostReport);
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);
  const userBanRepoToken = getRepositoryToken(UserBan);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,

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
          provide: memoryRepoToken,
          useValue: {}
        },
        {
          provide: userBanRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
