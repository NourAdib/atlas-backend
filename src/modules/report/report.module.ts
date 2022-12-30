import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/user.entity';
import { PostReport } from './entities/post-report.entity';
import { UserReport } from './entities/user-report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserReport, PostReport, Post, User])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
