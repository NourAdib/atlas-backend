import { Controller, UseGuards, Res, Request, Get, HttpStatus, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/post-create.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //TODO: Add image upload
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(@Body() body: CreatePostDto, @Request() req, @Res() res: Response) {
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
}
