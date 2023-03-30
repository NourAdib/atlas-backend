import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for appeal
 */
export class AppealDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  text: string;
}
