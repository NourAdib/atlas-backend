import {
  Controller,
  UseGuards,
  Res,
  Request,
  Post,
  HttpStatus,
  Body,
  Get,
  Param
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
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
  @Get(':id')
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
}
