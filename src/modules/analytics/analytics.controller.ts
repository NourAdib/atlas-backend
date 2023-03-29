import { Controller, Get, HttpStatus, Param, Res, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { Response } from 'express';
import { SubscriptionPlan } from '../../constants/subscription-plan.enum';
import { SubscriptionPlans } from '../../decorators/subscription.decorator';
import { SubscriptionsGuard } from '../auth/guards/subscriptions.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../constants/role.enum';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  /**
   * This API is only accessible to admins and allows them to view the analytics of any post
   * @param req the request object
   * @param postId the id of the post
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/post/:id')
  @Roles(Role.Admin)
  getAdminPostAnalytics(@Request() req, @Param('id') postId, @Res() res: Response) {
    this.analyticsService
      .getAdminPostAnalytics(req.user, postId)
      .then((analytics) => {
        return res.status(HttpStatus.OK).json(analytics);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * This API is only accessible to premium user and allows them to view the analytics of only their post
   * @param req the request object
   * @param postId the id of the post
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, SubscriptionsGuard)
  @Get('post/:id')
  @SubscriptionPlans(SubscriptionPlan.Premium)
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
