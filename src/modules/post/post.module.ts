import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { Scrapbook } from './entities/scrapbook.entity';
import { PostComment } from './entities/post-comment.entity';
import { UserComment } from './entities/user-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Scrapbook, PostComment, UserComment])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
