import { Controller, UseGuards, Res, Request, Post, HttpStatus } from '@nestjs/common';
import { Delete, Get, Param, Patch, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

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

  //Accept Follow
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

  //Reject Follow
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

  //Unfollow
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

  //Get Followers
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

  //Get Following
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

  //Get Follow Requests Received
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

  //Get Follow Requests Sent
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
