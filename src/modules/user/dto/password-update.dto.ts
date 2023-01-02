import { IsNotEmpty } from 'class-validator';

export class UpdateUserPasseordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
