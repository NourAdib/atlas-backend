import { Controller, UseGuards, Res, Request, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req, @Res() res: Response) {
    this.userService.getUserProfile(req.user).then((user) => {
      return res.status(HttpStatus.OK).json(user);
    });
  }
}
