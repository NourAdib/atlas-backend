import { IsNotEmpty } from 'class-validator';
import { LikeStatus } from 'src/constants/like-status.enum';

export class CreateLikeDto {
  @IsNotEmpty()
  status: LikeStatus;
}
