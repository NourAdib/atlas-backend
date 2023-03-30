import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { messaging } from '../../common/services/firebase-admin.service';
import { SendNotificationDto } from './dto/send-message.dto';
import { NotificationTargetGroup } from '../../constants/notification-target-group.enum';
import { NotificationPreference } from '../../constants/notification-preference.enum';
import { Role } from '../../constants/role.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  signup(user: any, fcmToken: string): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, { fcmToken: fcmToken });
  }

  /**
   * send notification to one user
   * @param sendNotificationDto the send notification dto
   * @returns the response
   */
  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<any> {
    if (sendNotificationDto.targetGroup === NotificationTargetGroup.SingleUser) {
      if (!sendNotificationDto.targetUserId) {
        throw new BadRequestException('Target User ID is required');
      }
      return await this.sendNotificationToOne(
        sendNotificationDto.title,
        sendNotificationDto.body,
        sendNotificationDto.targetUserId
      );
    }
    if (sendNotificationDto.targetGroup === NotificationTargetGroup.All) {
      return await this.sendNotificationToAll(sendNotificationDto.title, sendNotificationDto.body);
    }
    if (sendNotificationDto.targetGroup === NotificationTargetGroup.Celebrity) {
      return await this.sendNotificationToCelebrities(
        sendNotificationDto.title,
        sendNotificationDto.body
      );
    }
    if (sendNotificationDto.targetGroup === NotificationTargetGroup.Influencers) {
      return await this.sendNotificationToInfluencers(
        sendNotificationDto.title,
        sendNotificationDto.body
      );
    }
  }

  /**
   * send notification to one user
   * @param title the title of the notification
   * @param body the body of the notification
   * @returns the response
   */
  async sendNotificationToCelebrities(title: string, body: string): Promise<any> {
    const usersToBeNotified = await this.usersRepository.find({
      where: [
        {
          fcmToken: Not(''),
          role: Role.Celebrity,
          notificationPreference: NotificationPreference.SelectedGroup
        },
        {
          fcmToken: Not(''),
          role: Role.Celebrity,
          notificationPreference: NotificationPreference.All
        }
      ]
    });

    if (usersToBeNotified.length === 0) {
      throw new BadRequestException('No users to be notified');
    }

    const fcmTokens = usersToBeNotified.map((user) => {
      return user.fcmToken;
    });

    if (usersToBeNotified.length == 1) {
      const payload = {
        notification: {
          title: title,
          body: body
        },
        token: fcmTokens[0]
      };

      return messaging.send(payload);
    }

    const payload = {
      notification: {
        title: title,
        body: body
      },
      tokens: fcmTokens
    };

    return messaging.sendMulticast(payload);
  }

  /**
   * send notification to one user
   * @param title the title of the notification
   * @param body the body of the notification
   * @returns the response
   */
  async sendNotificationToInfluencers(title: string, body: string): Promise<any> {
    const usersToBeNotified = await this.usersRepository.find({
      where: [
        {
          fcmToken: Not(''),
          role: Role.Influencer,
          notificationPreference: NotificationPreference.SelectedGroup
        },
        {
          fcmToken: Not(''),
          role: Role.Influencer,
          notificationPreference: NotificationPreference.All
        }
      ]
    });

    if (usersToBeNotified.length === 0) {
      throw new BadRequestException('No users to be notified');
    }

    const fcmTokens = usersToBeNotified.map((user) => {
      return user.fcmToken;
    });

    if (usersToBeNotified.length == 1) {
      const payload = {
        notification: {
          title: title,
          body: body
        },
        token: fcmTokens[0]
      };

      return messaging.send(payload);
    }

    const payload = {
      notification: {
        title: title,
        body: body
      },
      tokens: fcmTokens
    };

    return messaging.sendMulticast(payload);
  }

  /**
   * send notification to all users
   * @param title the title of the notification
   * @param body the body of the notification
   * @returns the response
   */
  async sendNotificationToAll(title: string, body: string): Promise<any> {
    const usersToBeNotified = await this.usersRepository.find({
      where: [
        {
          fcmToken: Not(''),
          notificationPreference: NotificationPreference.Broadcast
        },
        {
          fcmToken: Not(''),
          notificationPreference: NotificationPreference.All
        }
      ]
    });

    if (usersToBeNotified.length === 0) {
      throw new BadRequestException('No users to be notified');
    }

    const fcmTokens = usersToBeNotified.map((user) => {
      return user.fcmToken;
    });

    if (usersToBeNotified.length == 1) {
      const payload = {
        notification: {
          title: title,
          body: body
        },
        token: fcmTokens[0]
      };

      return messaging.send(payload);
    }

    const payload = {
      notification: {
        title: title,
        body: body
      },
      tokens: fcmTokens
    };

    return messaging.sendMulticast(payload);
  }

  /**
   * send notification to one user
   * @param title the title of the notification
   * @param body the body of the notification
   * @param userId the user id
   * @returns the response
   */
  async sendNotificationToOne(title: string, body: string, userId): Promise<string> {
    const userToBeNotified = await this.usersRepository.findOne({
      where: {
        id: userId,
        fcmToken: Not(''),
        notificationPreference: Not(NotificationPreference.None)
      }
    });

    if (!userToBeNotified) {
      throw new BadRequestException('No user to be notified');
    }

    const payload = {
      notification: {
        title: title,
        body: body
      },
      token: userToBeNotified.fcmToken
    };

    return messaging.send(payload);
  }
}
