import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { NotificationTargetGroup } from 'src/constants/notification-target-group.enum';

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
