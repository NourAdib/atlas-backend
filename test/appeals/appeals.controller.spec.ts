import { Test, TestingModule } from '@nestjs/testing';
import { AppealsService } from '../../src/modules/appeals/appeals.service';
import { AppealsController } from '../../src/modules/appeals/appeals.controller';

describe('AppealsController', () => {
  let controller: AppealsController;
  let service: AppealsService;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppealsController],
      providers: [
        {
          provide: AppealsService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<AppealsController>(AppealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
