import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';
import { Scrapbook } from './entities/scrapbook.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Scrapbook)
    private scrapbookRepository: Repository<Scrapbook>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  /**
   * Creates a new post
   * @param user the user sending the request
   * @param post the post to be created
   * @returns the created post
   */
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
   * Returns all the posts of a user
   * @param user the user sending t he request
   * @returns the posts of the user
   */
  getUserPosts(user: any): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .select([
        'Post.id',
        'Post.caption',
        'Post.location',
        'Post.visibility',
        'Post.createdAt',
        'Post.location',
        'Post.tag',
        'Post.type',
        'post.imageUrl',
        'User.id',
        'User.username',
        'User.email'
      ])
      .where('User.id = :id', { id: user.id })
      .getMany();
  }

  /**
   * Returns all the scrapbooks of a user
   * @param user the user sending the request
   * @returns the scrapbooks of the user
   */
  getUserScrapbooks(user: any): Promise<Scrapbook[]> {
    return this.scrapbookRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Scrapbook.user', 'User')
      .select([
        'Scrapbook.id',
        'Scrapbook.caption',
        'Scrapbook.location',
        'Scrapbook.visibility',
        'Scrapbook.createdAt',
        'Scrapbook.location',
        'User.id',
        'User.username',
        'User.email'
      ])
      .where('User.id = :id', { id: user.id })
      .getMany();
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
      .where('Scrapbook.id = :id', { id: id })
      .getOne();
  }

  /**
   * Creates a new comment
   * @param user the user sending the request
   * @param Comment the comment to be created
   * @returns the created comment
   */
  async createComment(user: User, Comment: any): Promise<Comment> {
    const newComment = new Comment();
    newComment.author = user;
    newComment.comment = Comment.comment;
    newComment.created = Comment.created;
    newComment.commentOnPost = Comment.commentOnPost;
    return this.commentRepository.save(newComment);
  }

  /**
   * Gets the user comments
   * @param user the user sending the request
   * @returns the comment of the user
   */
  getUserComments(user: User): Promise<Comment[]> {
    return this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.author', 'User')
      .select(['Comment.id', 'Comment.created', 'Comment.comment', 'User.id', 'User.username'])
      .where('User.id = :id', { id: user.id })
      .getMany();
  }

  /**
   * Gets the post which has the comment
   * @param post post with the comment
   * @returns post of the comment
   */
  getPostComments(post: Post): Promise<Comment[]> {
    return this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.commentOnPost', 'Post')
      .select(['Comment.id', 'Comment.created', 'Comment.comment', 'Post.id'])
      .where('Post.id = :id', { id: post.id })
      .getMany();
  }

  /**
   * Gets the comment with given id
   * @param id id of the comment
   * @returns comment with its id
   */
  getCommentById(id: string): Promise<Comment> {
    return this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.comment', 'Comment')
      .where('Comment.id = :id', { id: id })
      .getOne();
  }
}
