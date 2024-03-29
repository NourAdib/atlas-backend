import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseStorageService } from '../..//common/services/firebase-storage.service';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from './dto/comment-create.dto';
import { Post } from './entities/post.entity';
import { Scrapbook } from './entities/scrapbook.entity';
import { Comment } from './entities/comment.entity';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../..//common/dto/page.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { Like } from './entities/post-like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Scrapbook)
    private scrapbookRepository: Repository<Scrapbook>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Creates a new post
   * @param user the user sending the request
   * @param post the post to be created
   * @returns the created post
   */
  createPost(user: User, post: any): Promise<Post> {
    const newPost = new Post();
    newPost.caption = post.caption;
    newPost.tag = post.tag;
    newPost.type = post.type;
    newPost.location = post.location;
    newPost.visibility = post.visibility;
    newPost.postedBy = user;
    return this.postRepository.save(newPost);
  }

  async createPostWithImage(user: User, post: any, image: any): Promise<Post> {
    const newPost = new Post();
    newPost.caption = post.caption;
    newPost.tag = post.tag;
    newPost.type = post.type;
    newPost.location = post.location;
    newPost.visibility = post.visibility;
    newPost.postedBy = user;
    const savedPost = await this.postRepository.save(newPost);
    const { imageId, url, expiryDate } = await new FirebaseStorageService().uploadPostImage(
      image.buffer,
      user.id,
      savedPost.id
    );

    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        imageId: imageId,
        imageUrl: url,
        imageExpiryDate: new Date(expiryDate)
      })
      .where('id = :id', { id: savedPost.id })
      .execute();

    return this.postRepository.findOneBy({ id: savedPost.id }).then((post) => {
      return post;
    });
  }

  /**
   * Creates a new scrapbook and if posts are present, creates them as well
   * @param user the user sending the request
   * @param scrapbook the scrapbook to be created
   * @returns the created scrapbook
   */
  async createScrapbook(user: User, scrapbook: any): Promise<Scrapbook> {
    const newScrapbook = new Scrapbook();
    newScrapbook.caption = scrapbook.caption;
    newScrapbook.location = scrapbook.location;
    newScrapbook.visibility = scrapbook.visibility;
    newScrapbook.user = user;
    newScrapbook.posts = [];

    if (scrapbook.posts) {
      for await (const post of scrapbook.posts) {
        await this.createPost(user, post).then((savedPost) => {
          newScrapbook.posts.push(savedPost);
        });
      }
    }

    return this.scrapbookRepository.save(newScrapbook);
  }

  /**
   * Gets a post by id
   * @param id the id of the post
   * @returns the post with the given id
   */
  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .leftJoinAndSelect('Post.comments', 'Comment')
      .leftJoinAndSelect('Comment.author', 'CommentUser')
      .leftJoinAndSelect('Post.likes', 'Like')
      .leftJoinAndSelect('Like.likedBy', 'LikeUser')
      .leftJoinAndSelect('Post.scrapbook', 'Scrapbook')
      .where('Post.id = :id', { id: id })
      .getOne();

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (post.imageId) {
      if (post.imageId && post.imageExpiryDate < new Date(Date.now())) {
        const { url, expiryDate } = await new FirebaseStorageService().getPostImageSignedURL(
          post.imageId,
          post.postedBy.id,
          post.id
        );

        this.postRepository
          .createQueryBuilder()
          .update(Post)
          .set({
            imageExpiryDate: new Date(expiryDate),
            imageUrl: url
          })
          .where('id = :id', { id: post.id })
          .execute();
      }
    }
    return post;
  }

  /**
   * Returns all the posts of a user
   * @param user the user sending t he request
   * @returns the posts of the user
   */
  async getUserPosts(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<Post>> {
    const queryResults = await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .where('User.id = :id', { id: user.id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Post.createdAt', 'DESC')
      .getManyAndCount()
      .then((userPostsAndCount) => {
        return {
          items: userPostsAndCount[0],
          itemsCount: userPostsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Post[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Returns all the scrapbooks of a user
   * @param user the user sending the request
   * @returns the scrapbooks of the user
   */
  async getUserScrapbooks(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<Scrapbook>> {
    const queryResults = await this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.user', 'User')
      .leftJoinAndSelect('Scrapbook.posts', 'Post')
      .where('User.id = :id', { id: user.id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Scrapbook.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userScrapbooksAndCount) => {
        return {
          items: userScrapbooksAndCount[0],
          itemsCount: userScrapbooksAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Scrapbook[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Returns the scrapbook with the given id
   * @param id the id of the scrapbook
   * @returns the scrapbook with the given id
   */
  getScrapbookById(id: string): Promise<Scrapbook> {
    return this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.posts', 'Post')
      .leftJoinAndSelect('Scrapbook.user', 'User')
      .where('Scrapbook.id = :id', { id: id })
      .getOne();
  }

  /**
   * Adds a post to a scrapbook
   * @param user the user sending the request
   * @param scrapbookId the id of the scrapbook
   * @param postId the id of the post
   * @returns the updated scrapbook
   */
  async addPostToScrapbook(user: any, scrapbookId: string, postId: string): Promise<Scrapbook> {
    const post = await this.postRepository.findOneBy({ id: postId });

    if (!post) {
      throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
    }
    const scrapbook = await this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.posts', 'Post')
      .where('Scrapbook.id = :id', { id: scrapbookId })
      .getOne();

    if (!scrapbook) {
      throw new HttpException('scrapbook does not exist', HttpStatus.NO_CONTENT);
    }

    if (!scrapbook.posts) {
      scrapbook.posts = [];
    }
    if (scrapbook.posts.find((p) => p.id === post.id)) {
      throw new HttpException('post already exists in scrapbook', HttpStatus.BAD_REQUEST);
    }
    scrapbook.posts.push(post);
    return await this.scrapbookRepository.save(scrapbook);
  }

  /**
   * Removes a post from a scrapbook
   * @param scrapbookId the id of the scrapbook
   * @param postId the id of the post
   * @returns the updated scrapbook
   */
  async removePostFromScrapbook(scrapbookId: string, postId: string): Promise<Scrapbook> {
    const scrapbook = await this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.posts', 'Post')
      .where('Scrapbook.id = :id', { id: scrapbookId })
      .getOne();

    if (!scrapbook) {
      throw new HttpException('scrapbook does not exist', HttpStatus.NO_CONTENT);
    }

    if (!scrapbook.posts) {
      throw new HttpException('scrapbook does not contain post', HttpStatus.NO_CONTENT);
    }

    const post = scrapbook.posts.find((p) => p.id === postId);

    if (!post) {
      throw new HttpException('scrapbook does not contain post', HttpStatus.NO_CONTENT);
    }

    scrapbook.posts = scrapbook.posts.filter((p) => p.id !== postId);
    return await this.scrapbookRepository.save(scrapbook);
  }

  /**
   * Deletes a post by id
   * @param user the user sending the request
   * @param postId the id of the post
   * @returns the delete operation results
   */
  async deletePostById(user: any, postId: string): Promise<DeleteResult> {
    const dbPost = await this.getPostById(postId).then((post) => {
      return post;
    });

    if (!dbPost) {
      throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
    }

    if (dbPost.imageId) {
      await new FirebaseStorageService().deletePostImage(dbPost.imageId, user.id, dbPost.id);
    }
    return await this.postRepository.delete({ id: postId });
  }

  /**
   * Adds a comment to a post
   * @param user the user sending the request
   * @param postId the id of the post
   * @param comment the comment to add
   * @returns the updated post
   */
  async addComment(user: any, postId: string, comment: CreateCommentDto): Promise<Post> {
    const post = await this.getPostById(postId).then((post) => {
      if (!post) {
        throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
      }

      return post;
    });
    const newComment = new Comment();
    newComment.author = user;
    newComment.text = comment.text;
    newComment.post = post;
    return this.commentRepository.save(newComment).then((comment) => {
      return this.getPostById(comment.post.id);
    });
  }

  /**
   * The comments for the given post
   * @param postId the id of the post
   * @param pageOptionsDto the page options
   * @returns the comments for the given post
   */
  async getPostComments(postId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Comment>> {
    const queryResults = await this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.post', 'Post')
      .select(['Comment.id', 'Comment.text', 'Comment.createdAt', 'Post.id'])
      .leftJoinAndSelect('Comment.author', 'User')
      .where('Comment.post.id = :id', { id: postId })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Comment.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userCommentsAndCount) => {
        return {
          items: userCommentsAndCount[0].map((comment) => {
            delete comment.post;
            return comment;
          }),
          itemsCount: userCommentsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Comment[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the comments for the given user
   * @param userId the id of the user
   * @param pageOptionsDto the page options
   * @returns the comments for the given user
   */
  async getUserComments(userId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Comment>> {
    const queryResults = await this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.post', 'Post')
      .select([
        'Comment.id',
        'Comment.text',
        'Comment.createdAt',
        'Post.id',
        'Post.caption',
        'Post.location',
        'Post.visibility',
        'Post.createdAt',
        'Post.tag',
        'Post.type',
        'Post.imageUrl',
        'Post.imageId'
      ])
      .leftJoinAndSelect('Comment.author', 'User')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Comment.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userCommentsAndCount) => {
        return {
          items: userCommentsAndCount[0].map((comment) => {
            delete comment.author;
            return comment;
          }),
          itemsCount: userCommentsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Comment[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Deletes a comment by id
   * @param user the user sending the request
   * @param commentId the id of the comment
   * @returns the delete operation results
   */
  async deleteComment(user: any, commentId: string): Promise<DeleteResult> {
    const comment = await this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.author', 'User')
      .where('Comment.author.id = :id', { id: user.id })
      .where('Comment.id = :id', { id: commentId })
      .getOne();

    if (!comment) {
      throw new HttpException('comment does not exist', HttpStatus.NO_CONTENT);
    }

    return await this.commentRepository.delete({ id: commentId });
  }

  /**
   * Likes a post
   * @param user the user sending the request
   * @param postId the id of the post
   * @returns the like
   */
  async likePost(user: any, postId: string): Promise<Like> {
    const post = await this.getPostById(postId).then((post) => {
      if (!post) {
        throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
      }

      return post;
    });

    if (post.likes.length === 0) {
      post.likes = [];
    }
    if (post.likes.find((like) => like.likedBy.id === user.id)) {
      throw new HttpException('post already liked', HttpStatus.BAD_REQUEST);
    }

    const dbUser = await this.userRepository.findOneBy({ id: user.id });

    const like = new Like();
    like.likedBy = dbUser;
    like.likedPost = post;

    return this.likeRepository.save(like);
  }

  /**
   * Unlikes a post
   * @param user the user sending the request
   * @param postId the id of the post
   * @returns the delete operation results
   */
  async unlikePost(user: any, postId: string): Promise<DeleteResult> {
    const post = await this.getPostById(postId).then((post) => {
      if (!post) {
        throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
      }

      return post;
    });

    if (post.likes.length === 0) {
      post.likes = [];
    }
    if (!post.likes.find((like) => like.likedBy.id === user.id)) {
      throw new HttpException('post not liked', HttpStatus.BAD_REQUEST);
    }

    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].likedBy.id === user.id) {
        await this.postRepository.update(post.id, { likesCount: post.likes.length - 1 });

        return this.likeRepository.delete({ id: post.likes[i].id });
      }
    }
  }

  /**
   * Gets the scraps of the user being followed
   * @param user the user sending the request
   * @param id the is of the user being followed
   * @param pageOptionsDto the page options
   * @returns the posts
   */
  async getFollowingScraps(
    user: User,
    id: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Post>> {
    const visitedUser = await this.userRepository.findOne({
      where: { id: id },
      relations: ['followers', 'followers.followedBy']
    });

    if (!visitedUser) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    let isFollowingUser = false;

    visitedUser.followers.forEach((follower) => {
      if (follower.followedBy.id === user.id) {
        isFollowingUser = true;
      }
    });

    if (!isFollowingUser) {
      throw new HttpException('user is not followed', HttpStatus.BAD_REQUEST);
    }

    const queryResults = await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .where('User.id = :id', { id: id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Post.createdAt', 'DESC')
      .getManyAndCount()
      .then((userPostsAndCount) => {
        return {
          items: userPostsAndCount[0],
          itemsCount: userPostsAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Post[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the scrapbooks of the user being followed
   * @param user the user sending the request
   * @param id the id of the user being followed
   * @param pageOptionsDto the page options
   * @returns the scrapbooks
   */
  async getFollowingScrapbooks(
    user: User,
    id: string,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Scrapbook>> {
    const visitedUser = await this.userRepository.findOne({
      where: { id: id },
      relations: ['followers', 'followers.followedBy']
    });

    if (!visitedUser) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    let isFollowingUser = false;

    visitedUser.followers.forEach((follower) => {
      if (follower.followedBy.id === user.id) {
        isFollowingUser = true;
      }
    });

    if (!isFollowingUser) {
      throw new HttpException('user is not followed', HttpStatus.BAD_REQUEST);
    }

    const queryResults = await this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.user', 'User')
      .leftJoinAndSelect('Scrapbook.posts', 'Post')
      .where('User.id = :id', { id: id })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('Scrapbook.createdAt', pageOptionsDto.order)
      .getManyAndCount()
      .then((userScrapbooksAndCount) => {
        return {
          items: userScrapbooksAndCount[0],
          itemsCount: userScrapbooksAndCount[1]
        };
      });

    const itemCount: number = queryResults.itemsCount;
    const entities: Scrapbook[] = queryResults.items;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
