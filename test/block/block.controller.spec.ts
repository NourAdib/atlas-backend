import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from '../../src/modules/block/block.service';
import { BlockController } from '../../src/modules/block/block.controller';

describe('BlockController', () => {
  let controller: BlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockController],
      providers: [
        {
          provide: BlockService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<BlockController>(BlockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
