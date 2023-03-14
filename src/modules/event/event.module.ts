import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';
import { EventClue } from './entities/eventClues.entity';
import { EventGoal } from './entities/eventGoal.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventClue, EventGoal, User])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
