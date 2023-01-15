import { IsNotEmpty } from 'class-validator';

export class AppealDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  text: string;
}
