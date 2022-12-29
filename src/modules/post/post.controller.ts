import {
  Controller,
  UseGuards,
  Res,
  Request,
  Get,
  HttpStatus,
  Post,
  Body,
  BadRequestException
} from '@nestjs/common';
import { Response } from 'express';
import { Visibility } from 'src/constants/visibility.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('scrapbook/:id')
  getUserScrapbook(@Request() req, @Res() res: Response) {
    this.postService.getScrapbookById(req.params.id).then((posts) => {
      return res.status(HttpStatus.OK).json(posts);
    });
  }
}
