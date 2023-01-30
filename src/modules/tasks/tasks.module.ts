import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { TasksService } from './tasks.service';
import { UserBan } from '../report/entities/user-ban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, UserBan])],
  providers: [TasksService]
})
export class TasksModule {}
