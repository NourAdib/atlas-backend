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
  Delete,
  Query
} from '@nestjs/common';
import { Response } from 'express';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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
  @Post('proximity-events')
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
  @Post('proximity-clues')
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
  getJoinedEvents(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.eventService
      .getJoinedEvents(req.user, pageOptionsDto)
      .then((events) => {
        return res.status(HttpStatus.OK).json(events);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-events')
  getUserEvents(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.eventService
      .getUserEvents(req.user, pageOptionsDto)
      .then((events) => {
        return res.status(HttpStatus.OK).json(events);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('active-events')
  @Roles(Role.Admin)
  getActiveEvents(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.eventService
      .getActiveEvents(pageOptionsDto)
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
