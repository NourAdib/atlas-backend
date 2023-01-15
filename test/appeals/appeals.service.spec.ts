import { Test, TestingModule } from '@nestjs/testing';
import { AppealsService } from '../../src/modules/appeals/appeals.service';

describe('AppealsService', () => {
  let service: AppealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppealsService]
    }).compile();

    service = module.get<AppealsService>(AppealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
