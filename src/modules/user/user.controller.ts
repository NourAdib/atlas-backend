import {
  Controller,
  UseGuards,
  Res,
  Request,
  Get,
  HttpStatus,
  Patch,
  BadRequestException,
  Post
} from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common/decorators';
import { Response } from 'express';
import { Role } from 'src/constants/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserEmailDto } from './dto/email-update.dto';
import { UpdateUserDateOfBirthDto } from './dto/dateofbirth-update.dto';
import { UpdateUserPhoneNumberDto } from './dto/phone-update.dto';
import { Gender } from 'src/constants/gender.enum';
import { UpdateUserPasseordDto } from './dto/password-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationPreference } from 'src/constants/notification-preference.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { UpdateUserBioDto } from './dto/bio-update.dto';

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
    this.userService
      .getUserProfile(req.user)
      .then((user) => {
        return res.status(HttpStatus.OK).json(user);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getUserProfileById(@Request() req, @Res() res: Response, @Param('id') id: string) {
    this.userService
      .getUserProfileById(id)
      .then((user) => {
        return res.status(HttpStatus.OK).json(user);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
        return res.status(HttpStatus.OK).json({ message: 'Role updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
  /**
   * updates the user email
   * @param body the Dto file
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('email')
  updateUserEmail(@Body() body: UpdateUserEmailDto, @Request() req, @Res() res: Response) {
    this.userService
      .updateUserEmail(req.user, body.email)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Email updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
    this.userService
      .updateUserAddress(req.user, address)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Address updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
    this.userService
      .updateUserFirstName(req.user, firstName)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'First name updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
  /**
   * updates the users last name
   * @param lastName the last name to be updated
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
    this.userService
      .updateUserLastName(req.user, lastName)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Last name updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
    this.userService
      .updateUsername(req.user, username)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Username updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
  /**
   * updates the user date of birth
   * @param body the Dto file
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
    this.userService
      .updateUserDateOfBirth(req.user, body.dateOfBirth)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Date of birth updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * updates the user's bio
   * @param body the Dto file
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Patch('bio')
  updateUserBio(@Body() body: UpdateUserBioDto, @Request() req, @Res() res: Response) {
    this.userService
      .updatedUserBio(req.user, body.bio)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Bio updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * updates the users phone number
   * @param body the Dto file
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
    this.userService
      .updateUserPhoneNumber(req.user, body.phoneNumber)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Phone number updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
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
        return res.status(err.status).json({ message: err.message });
      });
  }
  /**
   * @param req the request object
   * @param res the response object
   * @param Body the Dto file
   */
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  updateUserPassword(@Request() req, @Res() res: Response, @Body() body: UpdateUserPasseordDto) {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    this.userService
      .updateUserPassword(req.user, body)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Password updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Uploads a users avatar
   * @param req the request object
   * @param res the response object
   * @param file the file to be uploaded
   */
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async addUserAvatar(@Request() req, @Res() res: Response, @UploadedFile() file) {
    this.userService
      .addUserAvatar(req.user, file)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Avatar Added' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Returns an active users avatar url
   * @param req the request object
   * @param res the response object
   * @returns the url of the users avatar
   */
  @UseGuards(JwtAuthGuard)
  @Get('avatar')
  async getUserAvatar(@Request() req, @Res() res: Response) {
    return this.userService
      .getUserAvatar(req.user)
      .then((imageUrl) => {
        return res.status(HttpStatus.OK).json({ profilePictureUrl: imageUrl });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  /**
   * Replaces a users avatar with a new image
   * @param req the request object
   * @param res the response object
   * @param file the file to be uploaded
   */
  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserAvatar(@Request() req, @Res() res: Response, @UploadedFile() file) {
    this.userService
      .updateUserAvatar(req.user, file)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Avatar updated' });
      })
      .catch((err) => {
        return res.status(err.status || 500).json({ message: err.message });
      });
  }

  /**
   * Deletes a users avatar
   * @param req the request object
   * @param res the response object
   */
  @UseGuards(JwtAuthGuard)
  @Delete('avatar')
  async deleteUserAvatar(@Request() req, @Res() res: Response) {
    this.userService
      .deleteUserAvatar(req.user)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Avatar deleted' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('notification-prefences')
  async updateUserNotificationPreferences(
    @Request() req,
    @Res() res: Response,
    @Query('preference') notificationPreferences: NotificationPreference
  ) {
    this.userService
      .updateUserNotificationPreferences(req.user, notificationPreferences)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Notification preferences updated' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchUsers(
    @Request() req,
    @Res() res: Response,
    @Query('searchTerm') searchTerm: string,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.userService
      .searchUsers(searchTerm, pageOptionsDto)
      .then((users) => {
        return res.status(HttpStatus.OK).json(users);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteUser(@Request() req, @Res() res: Response) {
    this.userService
      .deleteUser(req.user)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'User deleted' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
