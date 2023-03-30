import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { NotificationTargetGroup } from '../../../constants/notification-target-group.enum';

/**
 * Data transfer object for sending a notification
 */
export class SendNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsEnum(NotificationTargetGroup)
  targetGroup: NotificationTargetGroup;

  @IsOptional()
  @IsUUID()
  targetUserId: string;
}
