import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
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

  getEventById(id: string): Promise<Event> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  async getProximityEvents(user: User, body: any): Promise<Event[]> {
    const [minLat, maxLat, minLon, maxLon] = this.getCoordinatesRadius(
      body.latitude,
      body.longitude
    );

    return this.eventRepository.find({
      where: [
        {
          longitude: MoreThan(minLon),
          latitude: MoreThan(minLat)
        },
        {
          longitude: LessThan(maxLon),
          latitude: LessThan(maxLat)
        }
      ],
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  async joinEvent(user: User, eventId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['clues', 'goal', 'creator', 'participants']
    });

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (event.participants.length >= event.numberOfParticipants) {
      throw new HttpException('Event is full', HttpStatus.BAD_REQUEST);
    }

    if (event.participants.some((p) => p.id === user.id)) {
      throw new HttpException('User already joined event', HttpStatus.BAD_REQUEST);
    }

    event.participants.push(user);

    await this.eventRepository.save(event);

    return event;
  }

  async getProximityClues(user: User, body: any): Promise<EventClue[]> {
    const [minLat, maxLat, minLon, maxLon] = this.getCoordinatesRadius(
      body.latitude,
      body.longitude
    );

    return this.eventClueRepository.find({
      where: [
        {
          longitude: MoreThan(minLon),
          latitude: MoreThan(minLat)
        },
        {
          longitude: LessThan(maxLon),
          latitude: LessThan(maxLat)
        },
        {
          event: { participants: { id: user.id } }
        }
      ],
      relations: ['event']
    });
  }

  async deleteEventById(user: User, eventId: string): Promise<DeleteResult> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['clues', 'goal', 'creator', 'participants']
    });

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (event.creator.id !== user.id) {
      throw new HttpException('User is not creator of event', HttpStatus.BAD_REQUEST);
    }

    return this.eventRepository.delete({ id: eventId });
  }

  async getJoinedEvents(user: User): Promise<Event[]> {
    return this.eventRepository.find({
      where: { participants: { id: user.id } },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  getCoordinatesRadius(lat: number, lon: number): [number, number, number, number] {
    const earthRadius = 6378137; // Earth's radius in meters
    const radius = 100; // 100-meter radius

    const latDiff = (radius / earthRadius) * (180 / Math.PI);
    const lonDiff = ((radius / earthRadius) * (180 / Math.PI)) / Math.cos((lat * Math.PI) / 180);

    const minLat = lat - latDiff;
    const maxLat = lat + latDiff;
    const minLon = lon - lonDiff;
    const maxLon = lon + lonDiff;

    return [minLat, maxLat, minLon, maxLon];
  }
}
