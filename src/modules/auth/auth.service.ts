import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/common/services/encryption.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  /**
   * Validate the user using password
   * @param email email of the user
   * @param pass password input by the user
   * @returns the user details (excluding password) or null if the user is not found or has an invalid password
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
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
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
