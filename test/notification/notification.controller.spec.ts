import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../src/modules/notification/notification.service';
import { NotificationController } from '../../src/modules/notification/notification.controller';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
