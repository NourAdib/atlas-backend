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
  Delete,
  UseInterceptors,
  UploadedFile,
  Patch
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Visibility } from 'src/constants/visibility.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/post-create.dto';
import { CreateScrapBookDto } from './dto/scrapbook-create.dts';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() body: CreatePostDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFile() file
  ) {
    if (!Object.values(Visibility).includes(body.visibility)) {
      throw new BadRequestException('Invalid visibility');
    }

    if (file) {
      console.log(file);

      this.postService.createPostWithImage(req.user, body, file).then((post) => {
        return res.status(HttpStatus.OK).json(post);
      });
    }

    if (!file) {
      this.postService.createPost(req.user, body).then((post) => {
        return res.status(HttpStatus.OK).json(post);
      });
    }
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getPostById(@Param('id') id: string, @Res() res: Response) {
    this.postService.getPostById(id).then((post) => {
      return res.status(HttpStatus.OK).json(post);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePostById(@Request() req, @Res() res: Response) {
    this.postService.deletePostById(req.user, req.params.id).then((post) => {
      return res.status(HttpStatus.OK).json(post);
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
   * Adds a post to a scrapbook
   * @param req the request object
   * @param res the response object
   * @param params the request params
   */
  @UseGuards(JwtAuthGuard)
  @Post('scrapbook/:id/add-post/:postId')
  addPostToScrapbook(@Request() req, @Res() res: Response, @Param() params) {
    this.postService
      .addPostToScrapbook(req.user, req.params.id, req.params.postId)
      .then((post) => {
        return res.status(HttpStatus.OK).json(post);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Removes a post from a scrapbook
   * @param req the request object
   * @param res the response object
   * @param params the request params
   */
  @UseGuards(JwtAuthGuard)
  @Patch('scrapbook/:id/remove-post/:postId')
  removePostFromScrapbook(@Request() req, @Res() res: Response, @Param() params) {
    this.postService
      .removePostFromScrapbook(params.id, params.postId)
      .then((post) => {
        return res.status(HttpStatus.OK).json(post);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
