import { Controller, Request, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/user-signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  //We inject the user servicec in the constructor
  constructor(private userService: UserService, private authService: AuthService) {}

  /**
   * We create a post route for the sign up, the route will be /user/signup
   * We use the @Body() decorator to get the body of the request and the body is a SignUpUserDto
   * @param body the request body
   * @param req the request object itself
   * @param res the respponse object we will send back to the user
   * @returns confirmation message or error message
   */
  @Post('signup')
  signUpUser(@Body() body: SignUpUserDto, @Request() req, @Res() res: Response) {
    console.log(body);
    
    if (body.password !== body.confirmPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Passwords do not match'
      });
    }

    this.userService.findOneByEmail(body.email).then((user: User) => {
      if (user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User already exists'
        });
      }
    });

    console.log('Here');
    

    this.userService.create(body).then((user: User) => {
      const { id, firstName, lastName, email } = user;
      return res.status(HttpStatus.CREATED).json({ id, firstName, lastName, email });
    });
  }

  /** creating post route, the route will be admin/signup
   * @param body the request body
   * @param req the request object itself
   * @param res the response object we will send back to the user
   * @returns confirmation message or error message
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/signup')
  @Roles(Role.Admin)
  signUpAdmin(@Body() body: SignUpUserDto, @Request() req, @Res() res: Response) {
    if (body.password !== body.confirmPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Passwords do not match'
      });
    }

    this.userService.findOneByEmail(body.email).then((user: User) => {
      if (user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User already exists'
        });
      }
    });

    this.userService.createAdmin(body).then((user: User) => {
      const { id, firstName, lastName, email } = user;
      return res.status(HttpStatus.CREATED).json({ id, firstName, lastName, email });
    });
  }
  /**
   * Route for login
   * The guard is used to protect the route, if the user is not authenticated, the route will not be accessible
   * The LocalAuthGuard will check if the user is authenticated using the local strategy
   * @param req The request object
   * @returns the JWT access token for the user
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    return this.authService.login(req.user);
  }
}
