import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseStorageService } from 'src/common/services/firebase-storage.service';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/comment-create.dto';
import { Post } from './entities/post.entity';
import { Scrapbook } from './entities/scrapbook.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { CreateLikeDto } from './dto/like-create.dto';

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
    private likeRepository: Repository<Like>
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

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Post.postedBy', 'User')
      .leftJoinAndSelect('Post.comments', 'Comment')
      .where('Post.id = :id', { id: id })
      .getOne();

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
    return post;
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

  async deletePostById(user: any, postId: string): Promise<DeleteResult> {
    const dbPost = await this.postRepository.findOneBy({ id: postId }).then((post) => {
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
   * Adds comments
   * @param user the user sending the request
   * @param postId Id of the post
   * @param comment comment to be added
   * @returns the created comment
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
   * Returns the post comments
   * @param postId Id of the post
   * @returns comments of the posts
   */
  async getPostComments(postId: string): Promise<Comment[]> {
    return this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.post', 'Post')
      .select(['Comment.id', 'Comment.text', 'Comment.createdAt', 'Post.id'])
      .leftJoinAndSelect('Comment.author', 'User')
      .where('Comment.post.id = :id', { id: postId })
      .getMany()
      .then((comments) => {
        return comments.map((comment) => {
          delete comment.post;
          return comment;
        });
      });
  }

  /**
   * Returns the user comments
   * @param userId Id of the user
   * @returns comments by the user
   */
  async getUserComments(userId: string): Promise<Comment[]> {
    return this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.author', 'User')
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
        'Post.location',
        'Post.tag',
        'Post.type',
        'Post.imageUrl',
        'Post.imageId'
      ])
      .where('Comment.author.id = :id', { id: userId })
      .getMany()
      .then((comments) => {
        return comments.map((comment) => {
          delete comment.author;
          return comment;
        });
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  /**
   * Returns the deleted comment
   * @param user user sending the request
   * @param commentId Id of the comment
   * @returns the deleted comment
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

  async addLike(user: any, postId: string, like: CreateLikeDto): Promise<Post> {
    const post = await this.getPostById(postId).then((post) => {
      if (!post) {
        throw new HttpException('post does not exist', HttpStatus.NO_CONTENT);
      }

      return post;
    });
    const newLike = new Like();
    newLike.status = like.status;
    newLike.post = post;
    return this.likeRepository.save(newLike).then((like) => {
      return this.getPostById(like.post.id);
    });
  }
}
