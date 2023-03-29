import { Controller, UseGuards, Res, Request, Post, Body, HttpStatus } from '@nestjs/common';
import { Get, Param, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { Role } from '../../constants/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  /**
   * Report a post
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('report-post')
  reportPost(@Body() body: ReportDto, @Request() req, @Res() res: Response) {
    this.reportService
      .reportPost(req.user, body)
      .then((report) => {
        return res.status(HttpStatus.OK).json(report);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Report a user
   * @param body the body of the request
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('report-user')
  reportUser(@Body() body: ReportDto, @Request() req, @Res() res: Response) {
    this.reportService
      .reportUser(req.user, body)
      .then((report) => {
        return res.status(HttpStatus.OK).json(report);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Get the reports of a post
   * @param req the request object
   * @param params the parameters (the id of the reported post)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('post-reports/:id')
  getPostReports(
    @Request() req,
    @Param() params,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.reportService
      .getPostReports(params.id, pageOptionsDto)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Get the reports of a user
   * @param req the request object
   * @param params the parameters (the id of the reported user)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('user-reports/:id')
  getUserReports(
    @Request() req,
    @Param() params,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.reportService
      .getUserReports(params.id, pageOptionsDto)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Bans a user
   * @param req the request object
   * @param params the parameters (the id of the user to be banned)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ban-user/:userId/:reportId')
  @Roles(Role.Admin)
  banUser(
    @Request() req,
    @Param('userId') userId,
    @Param('reportId') reportId,
    @Res() res: Response
  ) {
    this.reportService
      .banUser(userId, reportId)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Bans a post
   * @param req the request object
   * @param params the parameters (the id of the post to be banned)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ban-post/:postId/:reportId')
  @Roles(Role.Admin)
  banPost(
    @Request() req,
    @Param('postId') postId,
    @Param('reportId') reportId,
    @Res() res: Response
  ) {
    this.reportService
      .banPost(postId, reportId)
      .then(() => {
        return res.status(HttpStatus.OK).json({ 'message': 'Post banned' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Unbans a post
   * @param req the request object
   * @param params the parameters (the id of the user to be unbanned)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('unban-post/:id')
  @Roles(Role.Admin)
  unbanPost(@Request() req, @Param() params, @Res() res: Response) {
    this.reportService
      .unbanPost(params.id)
      .then(() => {
        return res.status(HttpStatus.OK).json({ 'message': 'Post unbanned' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('reported-posts')
  @Roles(Role.Admin)
  getReportedPosts(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.reportService
      .getReportedPosts(pageOptionsDto)
      .then((posts) => {
        return res.status(HttpStatus.OK).json(posts);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('reported-users')
  @Roles(Role.Admin)
  getReportedUsers(@Request() req, @Res() res: Response, @Query() pageOptionsDto: PageOptionsDto) {
    this.reportService
      .getReportedUsers(pageOptionsDto)
      .then((posts) => {
        return res.status(HttpStatus.OK).json(posts);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
