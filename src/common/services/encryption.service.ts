import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class EncryptionService {
  async encryptPassword(password: string): Promise<string> {
    const SALT_FACTOR = 10;
    return await hash(password, SALT_FACTOR);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
