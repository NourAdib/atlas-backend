import { Controller, UseGuards, Res, Request, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('test')
  @Roles(Role.Admin)
  test() {
    return 'test';
  }
}
