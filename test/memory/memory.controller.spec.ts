import { Test, TestingModule } from '@nestjs/testing';
import { MemoryService } from '../../src/modules/memory/memory.service';
import { MemoryController } from '../../src/modules/memory/memory.controller';

describe('MemoryController', () => {
  let controller: MemoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoryController],
      providers: [
        {
          provide: MemoryService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<MemoryController>(MemoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
