import { IsNotEmpty, MinLength } from 'class-validator';

/**
 * Data transfer object for updating a user's password
 */
export class UpdateUserPasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
