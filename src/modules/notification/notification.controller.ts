import { Controller, UseGuards, Post, Res, Param, Request, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SendNotificationDto } from './dto/send-message.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('signup/:fcmToken')
  signup(@Request() req, @Res() res: Response, @Param('fcmToken') fcmToken: string) {
    this.notificationService
      .signup(req.user, fcmToken)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'FCM token saved' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('send')
  @Roles(Role.Admin)
  sendNotificationToAll(@Request() req, @Res() res: Response, @Body() body: SendNotificationDto) {
    this.notificationService
      .sendNotification(body)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Notification sent' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
