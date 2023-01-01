import {
  Controller,
  UseGuards,
  Res,
  Request,
  Get,
  HttpStatus,
  Patch,
  BadRequestException
} from '@nestjs/common';
import { Body, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { brotliDecompressSync } from 'zlib';
import { UpdateUserEmailDto } from './dto/email-update.dto';
import { isEmail } from 'class-validator';
import { Post } from '../post/entities/post.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Returns the user profile
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req, @Res() res: Response) {
    this.userService.getUserProfile(req.user).then((user) => {
      return res.status(HttpStatus.OK).json(user);
    });
  }

  /**
   * Updates the user role
   * @param req the request object
   * @param res the response object
   * @param role the role to update to
   */
  @UseGuards(JwtAuthGuard)
  @Patch('role')
  updateUserRole(@Request() req, @Res() res: Response, @Query('role') role: Role) {
    this.userService
      .updateUserRole(req.user, role)
      .then(() => {
        return res.status(HttpStatus.OK).send();
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('email')
  updateUserEmail(@Body() body: UpdateUserEmailDto, @Request() req, @Res() res: Response) {
    this.userService.updateUserEmail(req.user, body.email).then(() => {
      return res.status(HttpStatus.OK).send();
    });
  }
}
