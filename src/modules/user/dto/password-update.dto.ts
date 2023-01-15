import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasseordDto {
  @IsNotEmpty()
  currentPassword: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
