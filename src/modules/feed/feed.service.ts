import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
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
        'following.followed.posts.comments',
        'following.followed.posts.comments.author'
      ],
      order: { createdAt: 'DESC' }
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const posts = dbUser.following.map((user) => user.followed.posts)[0];

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
