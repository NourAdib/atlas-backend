import { Test, TestingModule } from '@nestjs/testing';
import { FollowService } from '../../src/modules/follow/follow.service';
import { FollowController } from '../../src/modules/follow/follow.controller';

describe('FollowController', () => {
  let controller: FollowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowController],
      providers: [
        {
          provide: FollowService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<FollowController>(FollowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
