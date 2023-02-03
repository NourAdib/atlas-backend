import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Visibility } from 'src/constants/visibility.enum';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getFeed(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<Post>> {
    const dbUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: [
        'following',
        'following.followed.posts',
        'following.followed.posts.postedBy',
        'following.followed.posts.likes',
        'following.followed.posts.likes.likedBy',
        'following.followed.posts.comments',
        'following.followed.posts.comments.author'
      ]
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const publicPosts = await this.postRepository.find({
      where: { visibility: Visibility.Public },
      relations: ['postedBy', 'comments', 'likes', 'likes.likedBy', 'comments.author']
    });

    let posts = dbUser.following.map((user) => user.followed.posts)[0];

    if (!posts) {
      posts = [];
    }

    posts = posts
      .concat(publicPosts)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const paginatedPosts = posts.slice(
      (pageOptionsDto.page - 1) * pageOptionsDto.take,
      pageOptionsDto.page * pageOptionsDto.take
    );

    const itemCount: number = posts.length;
    const entities: Post[] = paginatedPosts;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}