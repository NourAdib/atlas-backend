import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/constants/role.enum';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { PostAnalyticResposneDto } from './dto/post-analytic-response.dto';
/**
 * Analytics service
 */
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  /**
   * gets admin analytics for a post
   * @param user the user making the request
   * @param postId the id of the post
   * @returns the analytics for the post
   */
  async getAdminPostAnalytics(user: any, postId: string): Promise<PostAnalyticResposneDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['postedBy', 'reportsAgainst', 'scrapbook', 'comments', 'appeals']
    });

    if (!post) {
      throw new BadRequestException('Post does not exist');
    }

    const commentCount = post.comments.length;
    const reportCount = post.reportsAgainst.length;
    const appealCount = post.appeals.length;
    const isPartOfScrapbook = post.scrapbook ? true : false;
    const interactionCount = commentCount;
    const isTakenDown = post.isTakenDown;
    const createdAt = new Date(post.createdAt);
    const response = new PostAnalyticResposneDto();
    response.commentCount = commentCount;
    response.likeCount = 0;
    response.interactionCount = interactionCount;
    response.isTakenDown = isTakenDown;
    response.reportCount = reportCount;
    response.appealCount = appealCount;
    response.createdAt = createdAt;
    response.isPartOfScrapbook = isPartOfScrapbook;

    if (isPartOfScrapbook) {
      response.scrapbookId = post.scrapbook.id;
    }

    return response;
  }
  /**
   * gets user analytics for a post
   * @param user the user making the request
   * @param postId the id of the post
   * @returns the analytics for the post
   */
  async getPostAnalytics(user: any, postId: string): Promise<PostAnalyticResposneDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['postedBy', 'reportsAgainst', 'scrapbook', 'comments', 'appeals']
    });

    if (user.role !== Role.Admin) {
      if (post.postedBy.id !== user.id) {
        throw new BadRequestException('You are not authorized to view the analytics of this post');
      }
    }

    if (!post) {
      throw new BadRequestException('Post does not exist');
    }

    const commentCount = post.comments.length;
    const reportCount = post.reportsAgainst.length;
    const appealCount = post.appeals.length;
    const isPartOfScrapbook = post.scrapbook ? true : false;
    const interactionCount = commentCount;
    const isTakenDown = post.isTakenDown;
    const createdAt = new Date(post.createdAt);
    const response = new PostAnalyticResposneDto();
    response.commentCount = commentCount;
    response.likeCount = 0;
    response.interactionCount = interactionCount;
    response.isTakenDown = isTakenDown;
    response.reportCount = reportCount;
    response.appealCount = appealCount;
    response.createdAt = createdAt;
    response.isPartOfScrapbook = isPartOfScrapbook;

    if (isPartOfScrapbook) {
      response.scrapbookId = post.scrapbook.id;
    }

    return response;
  }
}
