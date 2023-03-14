import {
  Controller,
  UseGuards,
  Res,
  Request,
  Post,
  HttpStatus,
  Body,
  Get,
  Param,
  Delete
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { GetProximityEventsDto } from './dto/get-proximity-events.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-event')
  createEvent(@Request() req, @Res() res: Response, @Body() body: CreateEventDto) {
    this.eventService
      .createEvent(req.user, body)
      .then((event) => {
        return res.status(HttpStatus.OK).json(event);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('join-event/:id')
  joinEvent(@Request() req, @Res() res: Response, @Param('id') eventId: string) {
    this.eventService
      .joinEvent(req.user, eventId)
      .then((event) => {
        return res.status(HttpStatus.OK).json(event);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('proximity-events')
  getProximityEvents(@Request() req, @Res() res: Response, @Body() body: GetProximityEventsDto) {
    this.eventService
      .getProximityEvents(req.user, body)
      .then((events) => {
        return res.status(HttpStatus.OK).json(events);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('proximity-clues')
  getProximityClues(@Request() req, @Res() res: Response, @Body() body: GetProximityEventsDto) {
    this.eventService
      .getProximityClues(req.user, body)
      .then((clues) => {
        return res.status(HttpStatus.OK).json(clues);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('joined-events')
  getJoinedEvents(@Request() req, @Res() res: Response) {
    this.eventService
      .getJoinedEvents(req.user)
      .then((events) => {
        return res.status(HttpStatus.OK).json(events);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getEventById(@Request() req, @Res() res: Response, @Param('id') eventId: string) {
    this.eventService
      .getEventById(eventId)
      .then((event) => {
        return res.status(HttpStatus.OK).json(event);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteEventById(@Request() req, @Res() res: Response, @Param('id') eventId: string) {
    this.eventService
      .deleteEventById(req.user, eventId)
      .then((_) => {
        return res.status(HttpStatus.OK).json({ message: 'Event deleted' });
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }
}
