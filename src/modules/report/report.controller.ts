import { Controller, UseGuards, Res, Request, Post, Body, HttpStatus } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

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
}
