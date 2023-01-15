import { Test, TestingModule } from '@nestjs/testing';
import { AppealsController } from '../../src/modules/appeals/appeals.controller';

describe('AppealsController', () => {
  let controller: AppealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppealsController]
    }).compile();

    controller = module.get<AppealsController>(AppealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
