import { IsEmail } from 'class-validator';
/**
 * to check for valid email while updating emails
 */
export class UpdateUserEmailDto {
  @IsEmail()
  email: string;
}
