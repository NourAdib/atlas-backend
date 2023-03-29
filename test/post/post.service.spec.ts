import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../src/modules/post/post.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../../src/modules/post/entities/post.entity';
import { Comment } from '../../src/modules/post/entities/comment.entity';
import { Scrapbook } from '../../src/modules/post/entities/scrapbook.entity';
import { Like } from '../../src/modules/post/entities/post-like.entity';

describe('PostService', () => {
  let service: PostService;
  const commentRepoToken = getRepositoryToken(Comment);
  const scrapbookRepoToken = getRepositoryToken(Scrapbook);
  const likeRepoToken = getRepositoryToken(Like);
  const postRepoToken = getRepositoryToken(Post);
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: commentRepoToken,
          useValue: {}
        },
        {
          provide: postRepoToken,
          useValue: {}
        },
        {
          provide: scrapbookRepoToken,
          useValue: {}
        },
        {
          provide: likeRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
