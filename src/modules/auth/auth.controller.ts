import { Controller, Request, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BodyValidationService } from 'src/common/services/bodyValidation.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SignUpUserDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
  //We inject the user servicec in the constructor
  constructor(private userService: UserService) {}

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
    if (BodyValidationService.containsUndefinedFields(body)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Please fill in all fields'
      });
    }

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

    this.userService.create(body).then((user: User) => {
      const { id, firstName, lastName, email } = user;
      return res.status(HttpStatus.CREATED).json({ id, firstName, lastName, email });
    });
  }
}
