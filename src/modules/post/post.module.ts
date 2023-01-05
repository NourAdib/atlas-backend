import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { Scrapbook } from './entities/scrapbook.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Scrapbook, User])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
