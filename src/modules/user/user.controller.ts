import { Controller, UseGuards, Res, Request, Get, HttpStatus, Patch } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';

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

  /* @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('test')
  @Roles(Role.Admin)
  test() {
    return 'test';
  } */
}
