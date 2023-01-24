import { Controller, Get, HttpStatus, Param, Res, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { Response } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('post/:id')
  getPostAnalytics(@Request() req, @Param('id') postId, @Res() res: Response) {
    this.analyticsService
      .getPostAnalytics(req.user, postId)
      .then((analytics) => {
        return res.status(HttpStatus.OK).json(analytics);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
