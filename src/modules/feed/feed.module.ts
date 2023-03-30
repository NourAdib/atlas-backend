import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

/**
 * Feed module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {}
