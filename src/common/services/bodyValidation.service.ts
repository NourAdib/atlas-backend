import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from 'src/modules/auth/dto/user-signup.dto';

@Injectable()
export class BodyValidationService {
  static containsUndefinedFields(requestBody: SignUpUserDto): boolean {
    if (requestBody.firstName === undefined) {
      return true;
    }
    if (requestBody.lastName === undefined) {
      return true;
    }
    if (requestBody.email === undefined) {
      return true;
    }
    if (requestBody.username === undefined) {
      return true;
    }
    if (requestBody.password === undefined) {
      return true;
    }
    if (requestBody.confirmPassword === undefined) {
      return true;
    }
    if (requestBody.dateOfBirth === undefined) {
      return true;
    }

    return false;
  }
}
