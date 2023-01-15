import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ReportStatus } from 'src/constants/report-status.enum';
import { Repository, UpdateResult } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/user.entity';
import { PostReport } from './entities/post-report.entity';
import { UserBan } from './entities/user-ban.entity';
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
    private userRepository: Repository<User>,

    @InjectRepository(UserBan)
    private userBanRepository: Repository<UserBan>
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
        relations: [
          'reportedPosts',
          'reportedPosts.reportedPost',
          'reportedPosts.reportedPost.postedBy'
        ]
      })
      .then((user) => {
        return user.reportedPosts.map((reports) => {
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

  async getPostReports(id: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<PostReport>> {
    const queryResults = await this.postReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('PostReport.reportedPost', 'Post')
      .leftJoinAndSelect('PostReport.reportedBy', 'ReportedBy')
      .leftJoinAndSelect('Post.postedBy', 'PostedBy')
      .where('PostReport.reportedPost.id = :id', { id: id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('PostReport.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((postReportsAndCount) => {
        return {
          items: postReportsAndCount[0],
          itemsCount: postReportsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: PostReport[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getUserReports(id: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<UserReport>> {
    const queryResults = await this.userReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('UserReport.reportedUser', 'User')
      .leftJoinAndSelect('UserReport.reportedBy', 'ReportedBy')
      .where('UserReport.reportedUser.id = :id', { id: id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('UserReport.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userReportsAndCount) => {
        return {
          items: userReportsAndCount[0],
          itemsCount: userReportsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: UserReport[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async banUser(id: string): Promise<UserBan> {
    const newBan = new UserBan();

    // Find the user to ban
    const user = await this.userRepository.findOne({
      where: { id: id }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NO_CONTENT);
    }

    const millisecondsInAWeek = 604800000;
    newBan.bannedUser = user;
    newBan.startDate = new Date(Date.now());
    newBan.endDate = new Date(Date.now() + millisecondsInAWeek); //Ban for 1 week
    return this.userBanRepository.save(newBan);
  }

  async banPost(postId: string, reportId: string): Promise<UpdateResult> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['postedBy']
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }

    const report = await this.postReportsRepository.findOne({
      where: { id: reportId }
    });

    if (!report) {
      throw new HttpException('Report not found', HttpStatus.NO_CONTENT);
    }

    report.status = ReportStatus.Accepted;
    await this.postReportsRepository.save(report);

    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ isTakenDown: true })
      .where('id = :id', { id: post.id })
      .execute();
  }

  async unbanPost(id: string): Promise<UpdateResult> {
    const post = await this.postRepository.findOne({
      where: { id: id }
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }

    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ isTakenDown: false })
      .where('id = :id', { id: post.id })
      .execute();
  }

  async getReportedPosts(pageOptionsDto: PageOptionsDto): Promise<PageDto<PostReport>> {
    const queryResults = await this.postReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('PostReport.reportedPost', 'Post')
      .leftJoinAndSelect('PostReport.reportedBy', 'ReportedBy')
      .leftJoinAndSelect('Post.postedBy', 'postedBy')
      .where('PostReport.status = :status', { status: ReportStatus.PendingReview })
      .groupBy('Post.id')
      .addGroupBy('PostReport.reason')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Post.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((postsAndCount) => {
        return {
          items: postsAndCount[0],
          itemsCount: postsAndCount[0].length
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: PostReport[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getReportedUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserReport>> {
    const queryResults = await this.userReportsRepository
      .createQueryBuilder()
      .leftJoinAndSelect('UserReport.reportedUser', 'User')
      .leftJoinAndSelect('UserReport.reportedBy', 'ReportedBy')
      .where('UserReport.status = :status', { status: ReportStatus.PendingReview })
      .groupBy('User.id')
      .addGroupBy('UserReport.reason')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('User.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((usersAndCount) => {
        return {
          items: usersAndCount[0],
          itemsCount: usersAndCount[0].length
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: UserReport[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
