import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../src/modules/post/post.service';
import { PostController } from '../../src/modules/post/post.controller';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
