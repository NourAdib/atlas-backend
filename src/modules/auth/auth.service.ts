import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/common/services/encryption.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
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

  async isUserBanned(user: any) {
    return this.usersService.isUserBanned(user.id).then((result) => {
      return result;
    });
  }
}
