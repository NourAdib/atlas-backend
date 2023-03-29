import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConfig from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //Extract the token from the authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Ensure that the token has not expired
      ignoreExpiration: false,
      //Use the secret to verify the token
      secretOrKey: jwtConfig.secret
    });
  }

  /**
   * validate the return user object from the jwt authentication
   * Invoked after Passport has verified the token
   * @param payload the payload of the token
   * @returns the user object
   */
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      subscriptionPlan: payload.subscriptionPlan
    };
  }
}
