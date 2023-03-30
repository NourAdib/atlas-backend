import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { PostReport } from './entities/post-report.entity';
import { UserBan } from './entities/user-ban.entity';
import { UserReport } from './entities/user-report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

/**
 * Report module
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserReport, PostReport, Post, User, UserBan])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
