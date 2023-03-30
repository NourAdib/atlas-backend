import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { ReportStatus } from '../../constants/report-status.enum';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { PostReport } from '../report/entities/post-report.entity';
import { User } from '../user/entities/user.entity';
import { AppealDto } from './dto/appeal.dto';
import { Appeal } from './entities/appeal.entity';

@Injectable()
export class AppealsService {
  constructor(
    @InjectRepository(Appeal)
    private appealRepository: Repository<Appeal>,

    @InjectRepository(PostReport)
    private postReportsRepository: Repository<PostReport>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Appeal a post's report
   * @param user the user who is appealing the post
   * @param body the appeal body
   * @returns the appeal
   */
  async appealPost(user: any, body: AppealDto): Promise<Appeal> {
    const newAppeal = new Appeal();

    const post = await this.postRepository.findOne({
      where: { id: body.postId },
      relations: ['reportsAgainst', 'postedBy', 'appeals']
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.appeals.some((appeal) => appeal.status === ReportStatus.PendingReview)) {
      throw new BadRequestException('Post has already been appealed');
    }

    if (post.postedBy.id !== user.id) {
      throw new BadRequestException('You can only appeal your posts');
    }

    if (
      !(
        post.reportsAgainst.some((report) => report.status === ReportStatus.Accepted) &&
        post.isTakenDown
      )
    ) {
      throw new BadRequestException('Post has not been reported or taken down');
    }

    const reportReason = post.reportsAgainst
      .filter((report) => {
        return report.status === ReportStatus.Accepted;
      })
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0].reason;

    newAppeal.appealedPost = post;
    newAppeal.appealedBy = post.postedBy;
    newAppeal.text = body.text;
    newAppeal.reportReason = reportReason;

    return this.appealRepository.save(newAppeal);
  }

  /**
   * Get the appeals for a post
   * @param postId the post id
   * @param user the user who is viewing the post's appeals
   * @param pageOptionsDto the page options
   * @returns the page of appeals
   */
  async getPostAppealsById(
    postId: string,
    user: any,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Appeal>> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['postedBy', 'appeals']
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.postedBy.id !== user.id) {
      throw new BadRequestException('You can only view your post appeals');
    }

    const itemCount: number = post.appeals.length;
    const entities: Appeal[] = post.appeals;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the appeals for a user
   * @param user the user who is viewing their appeals
   * @param pageOptionsDto the page options
   * @returns the page of appeals
   */
  async getUserAppeals(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<Appeal>> {
    const dbUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['appeals']
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const itemCount: number = dbUser.appeals.length;
    const entities: Appeal[] = dbUser.appeals;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Accepts a post's appeal
   * @param postId the post id
   * @returns the appeal
   */
  async acceptPostAppeal(postId: string): Promise<Appeal> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['appeals', 'postedBy']
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (!post.appeals.some((appeal) => appeal.status === ReportStatus.PendingReview)) {
      throw new BadRequestException('Post has not been appealed');
    }

    const appeal = post.appeals
      .map((appeal) => {
        if (appeal.status === ReportStatus.PendingReview) {
          return appeal;
        }
      })
      .filter((appeal) => appeal !== undefined)[0];

    appeal.status = ReportStatus.Accepted;

    await this.postRepository.update(postId, { isTakenDown: false });

    return this.appealRepository.save(appeal);
  }

  /**
   * Rejects a post's appeal
   * @param postId the post id
   * @returns the appeal
   */
  async rejectPostAppeal(postId: string): Promise<Appeal> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['appeals', 'postedBy']
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (!post.appeals.some((appeal) => appeal.status === ReportStatus.PendingReview)) {
      throw new BadRequestException('Post has not been appealed');
    }

    const appeal = post.appeals
      .map((appeal) => {
        if (appeal.status === ReportStatus.PendingReview) {
          return appeal;
        }
      })
      .filter((appeal) => appeal !== undefined)[0];

    appeal.status = ReportStatus.Rejected;

    return this.appealRepository.save(appeal);
  }

  /**
   * Gets the appeals for a post for an admin
   * @param pageOptionsDto the page options
   * @returns the page of appeals
   */
  async getPostAppeals(pageOptionsDto: PageOptionsDto): Promise<PageDto<Appeal>> {
    const appeals = await this.appealRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Appeal.appealedPost', 'Post')
      .leftJoinAndSelect('Post.postedBy', 'PostedBy')
      .leftJoinAndSelect('Appeal.appealedBy', 'User')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Appeal.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((appealsAndCount) => {
        return {
          items: appealsAndCount[0],
          itemsCount: appealsAndCount[0].length
        };
      });

    const itemCount: number = appeals.itemsCount;
    const entities: Appeal[] = appeals.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
