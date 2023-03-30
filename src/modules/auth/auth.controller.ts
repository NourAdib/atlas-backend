import {
  Controller,
  Request,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  Get
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Role } from '../../constants/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../user/entities/user.entity';
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
   * @param res the response object we will send back to the user
   * @returns confirmation message or error message
   */
  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  signUpUser(
    @Body() body: SignUpUserDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFile() file
  ) {
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

      if (!user) {
        if (file) {
          this.userService.createUserWithImage(body, file).then((user: User) => {
            const { id, firstName, lastName, email, profilePictureUrl } = user;
            return res
              .status(HttpStatus.CREATED)
              .json({ id, firstName, lastName, email, profilePictureUrl });
          });
        }

        if (!file) {
          this.userService.create(body).then((user: User) => {
            const { id, firstName, lastName, email } = user;
            return res.status(HttpStatus.CREATED).json({ id, firstName, lastName, email });
          });
        }
      }
    });
  }

  @Get('captcha')
  getCaptcha(@Res() res: Response) {
    this.authService
      .getCaptcha()
      .then((captcha) => {
        return res.status(HttpStatus.OK).send(captcha);
      })
      .catch((err) => {
        console.log(err);
        return res.status(err.status).json({ message: err.message });
      });
  }

  @Post('captcha')
  captchaResult(@Res() res: Response, @Body() captchaResponse) {
    this.authService
      .captchaResult(captchaResponse)
      .then((captcha) => {
        return res.status(HttpStatus.OK).send(captcha);
      })
      .catch((err) => {
        console.log(err);
        return res.status(err.status).json({ message: err.message });
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
    const isBanned = await this.authService.isUserBanned(req.user);

    if (!isBanned) {
      return this.authService.login(req.user);
    }

    throw new ForbiddenException('User banned');
  }
}
