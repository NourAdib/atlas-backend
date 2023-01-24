import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { User } from '../user/entities/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotificationModule],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
