import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../../src/modules/event/event.service';
import { EventController } from '../../src/modules/event/event.controller';

describe('EventController', () => {
  let controller: EventController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
