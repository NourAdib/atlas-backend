import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from '../../src/modules/block/block.service';
import { User } from '../../src/modules/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Block } from '../../src/modules/block/entities/block.entity';

describe('BlockService', () => {
  let service: BlockService;
  const blockRepoToken = getRepositoryToken(Block);
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: blockRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<BlockService>(BlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
