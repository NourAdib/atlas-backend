import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

/**
 * Service for encrypting and comparing passwords
 */
@Injectable()
export class EncryptionService {
  /**
   * Encrypts a password
   * @param password the password to encrypt
   * @returns the encrypted password
   */
  async encryptPassword(password: string): Promise<string> {
    const SALT_FACTOR = 10;
    return await hash(password, SALT_FACTOR);
  }

  /**
   * Compares a password with a hashed password
   * @param password the password to compare
   * @param hashedPassword the hashed password to compare with
   * @returns true if the passwords match, false otherwise
   */
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
