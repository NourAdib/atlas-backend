import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventClue } from './entities/eventClues.entity';
import { EventGoal } from './entities/eventGoal.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(EventGoal)
    private eventGoalRepository: Repository<EventGoal>,

    @InjectRepository(EventClue)
    private eventClueRepository: Repository<EventClue>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createEvent(user: User, createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new Event();
    newEvent.name = createEventDto.name;
    newEvent.description = createEventDto.description;
    newEvent.numberOfParticipants = createEventDto.numberOfParticipants;
    newEvent.latitude = createEventDto.latitude;
    newEvent.longitude = createEventDto.longitude;
    newEvent.visibility = createEventDto.visibility;
    newEvent.date = createEventDto.date;
    newEvent.creator = user;

    const eventGoal = new EventGoal();
    eventGoal.text = createEventDto.goal.text;
    eventGoal.latitude = createEventDto.goal.latitude;
    eventGoal.longitude = createEventDto.goal.longitude;
    eventGoal.creator = user;

    const dbEventGoal = await this.eventGoalRepository.save(eventGoal);
    newEvent.goal = dbEventGoal;

    const dbEvent = await this.eventRepository.save(newEvent);

    dbEventGoal.event = dbEvent;

    await this.eventGoalRepository.save(dbEventGoal);

    for (let i = 0; i < createEventDto.clues.length; i++) {
      const eventClue = new EventClue();
      eventClue.text = createEventDto.clues[i].text;
      eventClue.latitude = createEventDto.clues[i].latitude;
      eventClue.longitude = createEventDto.clues[i].longitude;
      eventClue.creator = user;
      eventClue.event = dbEvent;

      await this.eventClueRepository.save(eventClue);
    }

    return this.eventRepository.findOne({
      where: { id: dbEvent.id },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  //get proximity event
//get proximity clues

  getEventById(id: string): Promise<Event> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }
}
