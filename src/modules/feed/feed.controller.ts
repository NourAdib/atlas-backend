import { Controller, Get, HttpStatus, Res, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { FeedService } from './feed.service';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  /**
   * Gets the feed
   * @param req the request object
   * @param res the response object
   * @param pageOptionsDto the page options
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getFeed(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.feedService
      .getFeed(req.user, pageOptionsDto)
      .then((posts) => {
        return res.status(HttpStatus.OK).json(posts);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
