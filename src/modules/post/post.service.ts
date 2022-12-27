import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  //TODO: Add image upload
  createPost(user: User, post: any): Promise<Post> {
    const newPost = new Post();
    newPost.caption = post.caption;
    //newPost.imageUrl = post.imageUrl;
    newPost.tag = post.tag;
    newPost.type = post.type;
    newPost.location = post.location;
    newPost.visibility = post.visibility;
    newPost.postedBy = user;
    return this.postRepository.save(newPost);
  }

  getUserPosts(user: any): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .where('User.id = :id', { id: user.id })
      .getMany();
  }
}
