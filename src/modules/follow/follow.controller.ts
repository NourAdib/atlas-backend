import { Controller, UseGuards, Res, Request, Post, HttpStatus } from '@nestjs/common';
import { Delete, Get, Param, Patch, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { PageOptionsDto } from '../..//common/dto/page-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  /**
   * request to follow a user
   * @param req the request object
   * @param res the response object
   * @param id the id of the user to follow
   */
  @UseGuards(JwtAuthGuard)
  @Post('request-follow/:id')
  async requestFollow(@Request() req, @Res() res: Response, @Param('id') id: string) {
    this.followService
      .requestFollow(id, req.user)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * accept a follow request
   * @param req the request object
   * @param res the response object
   * @param requestId the id of the follow request
   */
  @UseGuards(JwtAuthGuard)
  @Patch('accept-follow/:requestId')
  async acceptFollow(@Request() req, @Res() res: Response, @Param('requestId') requestId: string) {
    this.followService
      .acceptFollow(requestId, req.user)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * reject a follow request
   * @param req the request object
   * @param res the response object
   * @param requestId the id of the follow request
   */
  @UseGuards(JwtAuthGuard)
  @Patch('reject-follow/:requestId')
  async rejectFollow(@Request() req, @Res() res: Response, @Param('requestId') requestId: string) {
    this.followService
      .rejectFollow(requestId, req.user)
      .then((_) => {
        return res.status(HttpStatus.OK).json({ message: 'Follow request rejected' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * unfollow a user
   * @param req the request object
   * @param res the response object
   * @param id the id of the user to unfollow
   */
  @UseGuards(JwtAuthGuard)
  @Delete('unfollow/:id')
  async unfollow(@Request() req, @Res() res: Response, @Param('id') id: string) {
    this.followService
      .unfollow(id, req.user)
      .then((_) => {
        return res.status(HttpStatus.OK).json({ message: 'Unfollowed' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * get all the followers of a user
   * @param req the request object
   * @param res the response object
   * @param pageOptionsDto the page options
   */
  @UseGuards(JwtAuthGuard)
  @Get('followers')
  async getFollowers(
    @Request() req,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.followService
      .getFollowers(req.user, pageOptionsDto)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * get all the users a user is following
   * @param req the request object
   * @param res the response object
   * @param pageOptionsDto the page options
   */
  @UseGuards(JwtAuthGuard)
  @Get('following')
  async getFollowing(
    @Request() req,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.followService
      .getFollowing(req.user, pageOptionsDto)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * get all the follow requests received by a user
   * @param req the request object
   * @param res the response object
   * @param pageOptionsDto the page options
   */
  @UseGuards(JwtAuthGuard)
  @Get('follow-requests-received')
  async getFollowRequestsReceived(
    @Request() req,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.followService
      .getFollowRequestsReceived(req.user, pageOptionsDto)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * get all the follow requests sent by a user
   * @param req the request object
   * @param res the response object
   * @param pageOptionsDto the page options
   */
  @UseGuards(JwtAuthGuard)
  @Get('follow-requests-sent')
  async getFollowRequestsSent(
    @Request() req,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.followService
      .getFollowRequestsSent(req.user, pageOptionsDto)
      .then((result) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
