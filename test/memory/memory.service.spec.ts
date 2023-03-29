import { Test, TestingModule } from '@nestjs/testing';
import { MemoryService } from '../../src/modules/memory/memory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Memory } from '../../src/modules/memory/entities/memory.entity';

describe('MemoryService', () => {
  let service: MemoryService;
  const memoryRepoToken = getRepositoryToken(Memory);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoryService,
        {
          provide: memoryRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<MemoryService>(MemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
