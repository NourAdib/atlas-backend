import { Module } from '@nestjs/common';
import { AppealsService } from './appeals.service';
import { AppealsController } from './appeals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Appeal } from './entities/appeal.entity';
import { Post } from '../post/entities/post.entity';
import { PostReport } from '../report/entities/post-report.entity';

/**
 * Appeals module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Appeal, Post, User, PostReport])],
  providers: [AppealsService],
  controllers: [AppealsController]
})
export class AppealsModule {}
