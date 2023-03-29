import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../../src/modules/event/event.service';
import { EventGoal } from '../../src/modules/event/entities/eventGoal.entity';
import { EventClue } from '../../src/modules/event/entities/eventClues.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/modules/user/entities/user.entity';
import { Event } from '../../src/modules/event/entities/event.entity';

describe('EventService', () => {
  let service: EventService;
  const eventClueRepoToken = getRepositoryToken(EventClue);
  const eventGoalRepoToken = getRepositoryToken(EventGoal);
  const eventRepoToken = getRepositoryToken(Event);
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: userRepoToken,
          useValue: {}
        },
        {
          provide: eventGoalRepoToken,
          useValue: {}
        },
        {
          provide: eventClueRepoToken,
          useValue: {}
        },
        {
          provide: eventRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
