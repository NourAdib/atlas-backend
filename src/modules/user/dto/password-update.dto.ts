import { IsNotEmpty } from 'class-validator';

export class UpdateUserPasseordDto {
  @IsNotEmpty()
  password: string;
  confirmPassword: string;
}
