import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { FollowRequest } from './entities/follow-request.entity';
import { Follow } from './entities/follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow, FollowRequest])],
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule {}
