import {
  Controller,
  UseGuards,
  Res,
  Request,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Patch,
  Query
} from '@nestjs/common';
import { Response } from 'express';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { Role } from '../../constants/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AppealsService } from './appeals.service';
import { AppealDto } from './dto/appeal.dto';

@Controller('appeals')
export class AppealsController {
  constructor(private appealsService: AppealsService) {}

  /**
   * Appeal a post
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('appeal-post')
  reportPost(@Body() body: AppealDto, @Request() req, @Res() res: Response) {
    this.appealsService
      .appealPost(req.user, body)
      .then((appeal) => {
        return res.status(HttpStatus.OK).json(appeal);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Accept an appeal
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('accept-appeal/:postId')
  @Roles(Role.Admin)
  acceptPostAppeal(@Request() req, @Param('postId') postId, @Res() res: Response) {
    this.appealsService
      .acceptPostAppeal(postId)
      .then((appeal) => {
        return res.status(HttpStatus.OK).json(appeal);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Reject an appeal
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('reject-appeal/:postId')
  @Roles(Role.Admin)
  rejectPostAppeal(@Request() req, @Param('postId') postId, @Res() res: Response) {
    this.appealsService
      .rejectPostAppeal(postId)
      .then((appeal) => {
        return res.status(HttpStatus.OK).json(appeal);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Get the appeals of a post
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('post-appeals/:postId')
  getPostAppealsById(
    @Request() req,
    @Param('postId') postId,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.appealsService
      .getPostAppealsById(postId, req.user, pageOptionsDto)
      .then((appeal) => {
        return res.status(HttpStatus.OK).json(appeal);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Get the appeals of a user
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('user-appeals')
  getUserAppeals(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.appealsService
      .getUserAppeals(req.user, pageOptionsDto)
      .then((appeal) => {
        return res.status(HttpStatus.OK).json(appeal);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('post-appeals')
  @Roles(Role.Admin)
  getPostAppeals(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.appealsService
      .getPostAppeals(pageOptionsDto)
      .then((appeals) => {
        return res.status(HttpStatus.OK).json(appeals);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
