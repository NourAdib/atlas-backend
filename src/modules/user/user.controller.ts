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
import { Response, query } from 'express';
import { Role } from 'src/constants/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { brotliDecompressSync } from 'zlib';
import { UpdateUserEmailDto } from './dto/email-update.dto';
import { isEmail } from 'class-validator';
import { Post } from '../post/entities/post.entity';
import { UpdateUserDateOfBirthDto } from './dto/dateofbirth-update.dto';
import { UpdateUserPhoneNumberDto } from './dto/phone-update.dto';
import { Gender } from 'src/constants/gender.enum';

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
  /**
   * updates the user email
   * @param body
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('email')
  updateUserEmail(@Body() body: UpdateUserEmailDto, @Request() req, @Res() res: Response) {
    this.userService.updateUserEmail(req.user, body.email).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Email updated' });
    });
  }
  /**
   * updates the user address
   * @param address the address to be updated
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('address')
  updateUserAddress(@Query('address') address: string, @Request() req, @Res() res: Response) {
    if (!address) {
      throw new BadRequestException('Adress must not be empty');
    }
    this.userService.updateUserAddress(req.user, address).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Address updated' });
    });
  }
  /**
   * updates the users first name
   * @param firstName the first name to be updated
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('firstName')
  updateUserFirstName(@Query('firstName') firstName: string, @Request() req, @Res() res: Response) {
    if (!firstName) {
      throw new BadRequestException('First name must not be empty');
    }
    if (firstName.length >= 255) {
      throw new BadRequestException('Name should be less than 256 charecters');
    }
    this.userService.updateUserFirstName(req.user, firstName).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'First name updated' });
    });
  }
  /**
   * updates the usres last name
   * @param lastName the first name to be updated
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('lastName')
  updateUserLastName(@Query('lastName') lastName: string, @Request() req, @Res() res: Response) {
    if (!lastName) {
      throw new BadRequestException('Last name must not be empty');
    }
    if (lastName.length >= 255) {
      throw new BadRequestException('Name should be less than 256 charecters');
    }
    this.userService.updateUserLastName(req.user, lastName).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Last name updated' });
    });
  }
  /**
   * updates the usrename
   * @param username the username to be updated
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('username')
  updateUsername(@Query('username') username: string, @Request() req, @Res() res: Response) {
    if (!username) {
      throw new BadRequestException('Username must not be empty');
    }
    if (username.length > 30) {
      throw new BadRequestException('Userame should be less than 30 charecters');
    }
    this.userService.updateUsername(req.user, username).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Username updated' });
    });
  }
  /**
   * updates the user date of birth
   * @param body
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('dateOfBirth')
  updateUserDateOfBirth(
    @Body() body: UpdateUserDateOfBirthDto,
    @Request() req,
    @Res() res: Response
  ) {
    this.userService.updateUserDateOfBirth(req.user, body.dateOfBirth).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Date of birth updated' });
    });
  }
  /**
   * updates the users phone number
   * @param body
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('phoneNumber')
  updateUserPhoneNumber(
    @Body() body: UpdateUserPhoneNumberDto,
    @Request() req,
    @Res() res: Response
  ) {
    this.userService.updateUserPhoneNumber(req.user, body.phoneNumber).then(() => {
      return res.status(HttpStatus.OK).json({ message: 'Phone number updated' });
    });
  }
  /**
   * Updates the user gender
   * @param req the request object
   * @param res the response object
   * @param gender the gender to update to
   */
  @UseGuards(JwtAuthGuard)
  @Patch('gender')
  updateUserGender(@Request() req, @Res() res: Response, @Query('gender') gender: Gender) {
    this.userService
      .updateUserGender(req.user, gender)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Gender updated' });
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
