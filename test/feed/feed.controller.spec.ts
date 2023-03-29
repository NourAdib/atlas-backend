import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from '../../src/modules/feed/feed.service';
import { FeedController } from '../../src/modules/feed/feed.controller';

describe('FeedController', () => {
  let controller: FeedController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
