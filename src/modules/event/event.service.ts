import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
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

  /**
   * creates an event
   * @param user the user making the request
   * @param createEventDto the event data
   * @returns the created event
   */
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
      eventClue.date = dbEvent.date;
      eventClue.event = dbEvent;

      await this.eventClueRepository.save(eventClue);
    }

    return this.eventRepository.findOne({
      where: { id: dbEvent.id },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  /**
   * gets all events from the database
   * @param id the id of the event
   * @returns the event with the given id
   */
  getEventById(id: string): Promise<Event> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['clues', 'goal', 'creator', 'participants']
    });
  }

  /**
   * gets all events from the database which are within the given radius
   * @param user the user that is requesting the events
   * @param body the body of the request
   * @returns the events that are in the proximity of the user
   */
  async getProximityEvents(user: User, body: any): Promise<Event[]> {
    const [minLat, maxLat, minLon, maxLon] = this.getCoordinatesRadius(
      body.latitude,
      body.longitude
    );

    return this.eventRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Event.participants', 'Participants')
      .leftJoinAndSelect('Event.clues', 'Clues')
      .leftJoinAndSelect('Event.goal', 'Goal')
      .leftJoinAndSelect('Event.creator', 'Creator')
      .where({
        longitude: MoreThan(minLon),
        latitude: MoreThan(minLat)
      })
      .andWhere({
        longitude: LessThan(maxLon),
        latitude: LessThan(maxLat)
      })
      .andWhere({
        date: MoreThan(new Date(Date.now() - 604800000))
      })
      .getMany();
  }

  /**
   * joins an event
   * @param user the user that is requesting the events
   * @param eventId the id of the event
   * @returns the event with the given id
   */
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

  /**
   * gets the clues of an event which are within the given radius
   * @param user the user that is requesting the events
   * @param body the body of the request
   * @returns the events that are in the proximity of the user
   */
  async getProximityClues(user: User, body: any): Promise<EventClue[]> {
    const [minLat, maxLat, minLon, maxLon] = this.getCoordinatesRadius(
      body.latitude,
      body.longitude
    );

    return this.eventClueRepository
      .createQueryBuilder()
      .leftJoinAndSelect('EventClue.event', 'Event')
      .leftJoinAndSelect('Event.participants', 'Participants')
      .where({
        longitude: MoreThan(minLon),
        latitude: MoreThan(minLat)
      })
      .andWhere({
        longitude: LessThan(maxLon),
        latitude: LessThan(maxLat)
      })
      .andWhere({ date: MoreThan(new Date(Date.now() - 604800000)) })
      .andWhere('Participants.id = :id', { id: user.id })
      .getMany();
  }

  /**
   * deletes an event
   * @param user the user that is requesting the events
   * @param eventId the id of the event
   * @returns the event with the given id
   */
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

  /**
   * gets all joined events of a user
   * @param user the user that is requesting the events
   * @param pageOptionsDto the page options
   * @returns the events that are in the proximity of the user
   */
  async getJoinedEvents(user: User, pageOptionsDto: PageOptionsDto): Promise<PageDto<Event>> {
    const queryResults = await this.eventRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Event.creator', 'Creator')
      .leftJoinAndSelect('Event.participants', 'Participants')
      .leftJoinAndSelect('Event.clues', 'Clues')
      .leftJoinAndSelect('Event.goal', 'Goal')
      .where('Participants.id = :id', { id: user.id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Event.createdAt', 'DESC')
      .getManyAndCount()
      .then((userEventsAndCount) => {
        return {
          items: userEventsAndCount[0],
          itemsCount: userEventsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Event[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * get all events of a user
   * @param user the user that is requesting the events
   * @param pageOptionsDto the page options
   * @returns the events that are in the proximity of the user
   */
  async getUserEvents(user: User, pageOptionsDto: PageOptionsDto): Promise<PageDto<Event>> {
    const queryResults = await this.eventRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Event.creator', 'Creator')
      .leftJoinAndSelect('Event.participants', 'Participants')
      .leftJoinAndSelect('Event.clues', 'Clues')
      .leftJoinAndSelect('Event.goal', 'Goal')
      .where('Creator.id = :id', { id: user.id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Event.createdAt', 'DESC')
      .getManyAndCount()
      .then((userEventsAndCount) => {
        return {
          items: userEventsAndCount[0],
          itemsCount: userEventsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Event[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * gets the coordinates of the radius
   * @param lat the latitude of the user
   * @param lon the longitude of the user
   * @returns the coordinates of the radius
   */
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

  /**
   * get all active events
   * @param pageOptionsDto the page options
   * @returns the events that are in the proximity of the user
   */
  async getActiveEvents(pageOptionsDto: PageOptionsDto): Promise<PageDto<Event>> {
    const queryResults = await this.eventRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Event.creator', 'Creator')
      .leftJoinAndSelect('Event.participants', 'Participants')
      .leftJoinAndSelect('Event.clues', 'Clues')
      .leftJoinAndSelect('Event.goal', 'Goal')
      .where({ date: MoreThan(new Date(Date.now() - 604800000)) })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Event.createdAt', 'DESC')
      .getManyAndCount()
      .then((userEventsAndCount) => {
        return {
          items: userEventsAndCount[0],
          itemsCount: userEventsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Event[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
