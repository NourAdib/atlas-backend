import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/common/services/encryption.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ReCaptchaResponseDto } from './dto/captcha-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /**
   * Validate the user using password
   * @param email email of the user
   * @param pass password input by the user
   * @returns the user details (excluding password) or null if the user is not found or has an invalid password
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select(['id', 'email', 'password', 'role', 'subscriptionPlan'])
      .where('email = :email', { email: email })
      .getRawOne();

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordsMatch = await new EncryptionService().comparePasswords(pass, user.password);

    if (user && passwordsMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * This method is called after the user is authenticated by the local strategy and returns the JWT token
   * @param user the authenticated user
   * @returns the JWT token
   */
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      subscriptionPlan: user.subscriptionPlan
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  /**
   * checks if the user is banned
   * @param user the user to check
   * @returns the user's ban status
   */
  async isUserBanned(user: any) {
    return this.usersService.isUserBanned(user.id).then((result) => {
      return result;
    });
  }
  /**
   * gets the captcha html
   * @returns the captcha html
   */
  async getCaptcha() {
    const sitekey = process.env.RECAPTCHA_SITE_KEY;
    return `<html> <head> <title>reCAPTCHA demo: Simple page</title> <script src="https://www.google.com/recaptcha/api.js" async defer></script> </head> <body> <form action="?" method="POST"> <div class="g-recaptcha" data-sitekey="${sitekey}"></div> <br/> <input type="submit" value="Submit"> </form> </body></html>`;
  }
  /**
   * gets the captcha response
   * @param body the body of the request
   * @returns the captcha response
   */
  async captchaResult(body: any) {
    const captchaResponse = await this.validateCaptchaResponse(body['g-recaptcha-response']);
    const response: ReCaptchaResponseDto = JSON.parse(JSON.stringify(captchaResponse));

    if (response.success) {
      return '<html><head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet"></head><style>body { text-align: center; padding: 40px 0; background: #EBF0F5; } h1 { color: #88B04B; font-family: "Nunito Sans", "Helvetica Neue", sans-serif; font-weight: 900; font-size: 40px; margin-bottom: 10px; } p { color: #404F5E; font-family: "Nunito Sans", "Helvetica Neue", sans-serif; font-size: 20px; margin: 0; } i { color: #9ABC66; font-size: 100px; line-height: 200px; margin-left: -15px; } .card { background: white; padding: 60px; border-radius: 4px; box-shadow: 0 2px 3px #C8D0D8; display: inline-block; margin: 0 auto; } </style> <body> <div class="card"> <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"> <i class="checkmark">✓</i> </div> <h1>Success</h1> <p>Verification successful, you can now close this page</p> </div> </body> </html>';
    } else {
      throw new BadRequestException('Captcha failed');
    }
  }
  /**
   * validates the captcha response
   * @param gReCaptchaResponse the captcha response
   * @returns the captcha response
   */
  async validateCaptchaResponse(gReCaptchaResponse: string) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://www.google.com/recaptcha/api/siteverify?response=${gReCaptchaResponse}&secret=${secretKey}`
    };

    return this.httpService
      .axiosRef(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
