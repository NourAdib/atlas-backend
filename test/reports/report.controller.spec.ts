import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from '../../src/modules/report/report.service';
import { ReportController } from '../../src/modules/report/report.controller';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
