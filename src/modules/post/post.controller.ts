import {
  Controller,
  UseGuards,
  Res,
  Request,
  Get,
  HttpStatus,
  Post,
  Body,
  BadRequestException,
  Param,
  Delete
} from '@nestjs/common';
import { Response } from 'express';
import { Visibility } from 'src/constants/visibility.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { commentDto } from './dto/comments.dto';
import { CreatePostDto } from './dto/post-create.dto';
import { CreateScrapBookDto } from './dto/scrapbook-create.dts';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //TODO: Add image upload
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(@Body() body: CreatePostDto, @Request() req, @Res() res: Response) {
    if (!Object.values(Visibility).includes(body.visibility)) {
      throw new BadRequestException('Invalid visibility');
    }

    this.postService.createPost(req.user, body).then((post) => {
      return res.status(HttpStatus.OK).json(post);
    });
  }

  /**
   * Returns the posts of the user sending the request
   * @param req the request object
   * @param res the response object
   */
  //TODO: Add pagination
  @UseGuards(JwtAuthGuard)
  @Get('user-posts')
  getUserPosts(@Request() req, @Res() res: Response) {
    this.postService.getUserPosts(req.user).then((posts) => {
      return res.status(HttpStatus.OK).json(posts);
    });
  }

  //Comments api
  /**
   * Creates the a new comment
   * @param body the request body
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('comment/create')
  createComment(@Body() body: commentDto, @Request() req, @Res() res: Response) {
    this.postService
      .createComment(req.user, body)
      .then((comment) => {
        return res.status(HttpStatus.OK).json(comment);
      })
      .catch((err) => {
        const { message } = err;

        if (err.status === HttpStatus.NO_CONTENT) {
          return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ 'message': message });
      });
  }

  /**
   * Gets the user's comments
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('comment/user-comments')
  getUserComments(@Request() req, @Res() res: Response) {
    this.postService.getUserComments(req.user).then((comment) => {
      return res.status(HttpStatus.OK).json(comment);
    });
  }

  /**
   * Gets the post with the comment
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('comment/post-comments')
  getPostComments(@Request() req, @Res() res: Response) {
    this.postService.getPostComments(req.user).then((comment) => {
      return res.status(HttpStatus.OK).json(comment);
    });
  }

  /**
   * Gets the comments by id
   * @param req the request object
   * @param params the request params
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('comment/:id')
  getCommentById(@Request() req, @Param() params, @Res() res: Response) {
    this.postService.getCommentById(params.id).then((comment) => {
      return res.status(HttpStatus.OK).json(comment);
    });
  }

  /**
   * Deletes the comment by id
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Delete('comment/:id')
  deleteCommentById(@Request() req, @Res() res: Response) {
    this.postService.deleteCommentbyId(req.params.id).then((comment) => {
      return res.status(HttpStatus.OK).json(comment);
    });
  }
  /************************** SCRAPBOOK APIs **************************/
  /**
   * Creates a new scrapbook
   * @param body the request body
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('scrapbook/create')
  createScrapbook(@Body() body: CreateScrapBookDto, @Request() req, @Res() res: Response) {
    if (!Object.values(Visibility).includes(body.visibility)) {
      throw new BadRequestException('Invalid visibility');
    }

    this.postService.createScrapbook(req.user, body).then((post) => {
      return res.status(HttpStatus.OK).json(post);
    });
  }

  /**
   * Returns the scrapbooks of the user sending the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('scrapbook/user-scrapbooks')
  getUserScrapbooks(@Request() req, @Res() res: Response) {
    this.postService.getUserScrapbooks(req.user).then((posts) => {
      return res.status(HttpStatus.OK).json(posts);
    });
  }

  /**
   * Returns the scrapbook with the given id
   * @param req the request object
   * @param params the request params
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('scrapbook/:id')
  getUserScrapbook(@Request() req, @Param() params, @Res() res: Response) {
    this.postService.getScrapbookById(params.id).then((posts) => {
      return res.status(HttpStatus.OK).json(posts);
    });
  }
}
