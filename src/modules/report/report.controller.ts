import { Controller, UseGuards, Res, Request, Post, Body, HttpStatus } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
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
        const { message } = err;

        if (err.status === HttpStatus.NO_CONTENT) {
          return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ 'message': message });
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
        const { message } = err;

        if (err.status === HttpStatus.NO_CONTENT) {
          return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ 'message': message });
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
  getPostReports(@Request() req, @Param() params, @Res() res: Response) {
    this.reportService
      .getPostReports(params.id)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
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
   * Get the reports of a user
   * @param req the request object
   * @param params the parameters (the id of the reported user)
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('user-reports/:id')
  getUserReports(@Request() req, @Param() params, @Res() res: Response) {
    this.reportService
      .getUserReports(params.id)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
      })
      .catch((err) => {
        const { message } = err;

        if (err.status === HttpStatus.NO_CONTENT) {
          return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ 'message': message });
      });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ban-user/:id')
  @Roles(Role.Admin)
  banUser(@Request() req, @Param() params, @Res() res: Response) {
    this.reportService
      .banUser(params.id)
      .then((reports) => {
        return res.status(HttpStatus.OK).json(reports);
      })
      .catch((err) => {
        const { message } = err;

        if (err.status === HttpStatus.NO_CONTENT) {
          return res.status(HttpStatus.NO_CONTENT).send();
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ 'message': message });
      });
  }
}
