import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportStatus } from 'src/constants/report-status.enum';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/user.entity';
import { PostReport } from './entities/post-report.entity';
import { UserReport } from './entities/user-report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(UserReport)
    private userReportsRepository: Repository<UserReport>,

    @InjectRepository(PostReport)
    private postReportsRepository: Repository<PostReport>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async reportPost(user: any, body: any): Promise<PostReport> {
    const newReport = new PostReport();
    newReport.reportedBy = user;

    // Find the post to report
    const post = await this.postRepository.findOne({
      where: { id: body.id },
      relations: ['postedBy']
    });

    // If the post doesn't exist, throw an error
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }

    if (post.postedBy.id === user.id) {
      throw new HttpException('You cannot report your own post', HttpStatus.BAD_REQUEST);
    }

    // If the post has already been reported and is still pending response, throw an error
    const userReportedPosts = await this.userRepository
      .findOne({
        where: { id: user.id },
        relations: ['reportedPosts', 'reportedPosts.reportedPost']
      })
      .then((user) => {
        return user.reportedPosts.map((reports) => {
          console.log('reports', reports);
          if ((reports.status = ReportStatus.PendingReview)) {
            return reports.reportedPost;
          }
        });
      });

    const postAlreadyReported = userReportedPosts.map((reportedPost) => {
      if (!reportedPost) {
        return false;
      }
      return reportedPost.id === post.id;
    });

    if (postAlreadyReported.includes(true)) {
      throw new HttpException('You have already reported this post', HttpStatus.BAD_REQUEST);
    }

    newReport.reportedPost = post;
    newReport.reason = body.reason;

    return this.postReportsRepository.save(newReport);
  }

  async reportUser(user: any, body: any): Promise<UserReport> {
    const newReport = new UserReport();
    newReport.reportedBy = user;

    // Find the user to report
    const userToBeReported = await this.userRepository.findOne({
      where: { id: body.id }
    });

    // If the user doesn't exist, throw an error
    if (!userToBeReported) {
      throw new HttpException('User not found', HttpStatus.NO_CONTENT);
    }

    if (userToBeReported.id === user.id) {
      throw new HttpException('You cannot report yourself', HttpStatus.BAD_REQUEST);
    }

    // If the user has already been reported and is still pending response, throw an error
    const userReportedUsers = await this.userRepository
      .findOne({
        where: { id: user.id },
        relations: ['reportedUsers', 'reportedUsers.reportedUser']
      })
      .then((user) => {
        return user.reportedUsers.map((reports) => {
          if ((reports.status = ReportStatus.PendingReview)) {
            return reports.reportedUser;
          }
        });
      });

    const usersAlreadyReported = userReportedUsers.map((reportedUser) => {
      return reportedUser.id === userToBeReported.id;
    });

    if (usersAlreadyReported.includes(true)) {
      throw new HttpException('You have already reported this user', HttpStatus.BAD_REQUEST);
    }

    newReport.reportedUser = userToBeReported;
    newReport.reason = body.reason;

    return this.userReportsRepository.save(newReport);
  }

  async getPostReports(id: string): Promise<PostReport[]> {
    return this.postReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('PostReport.reportedPost', 'Post')
      .leftJoinAndSelect('PostReport.reportedBy', 'ReportedBy')
      .where('PostReport.reportedPost.id = :id', { id: id })
      .getMany();
  }

  async getUserReports(id: string): Promise<UserReport[]> {
    return this.userReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('UserReport.reportedUser', 'User')
      .leftJoinAndSelect('UserReport.reportedBy', 'ReportedBy')
      .where('UserReport.reportedUser.id = :id', { id: id })
      .getMany();
  }
}