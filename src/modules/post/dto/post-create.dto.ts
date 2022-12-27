import { IsNotEmpty } from 'class-validator';
import { Visibility } from 'src/constants/visibility.enum';

/**
 * This is the DTO for creating a post
 */
export class CreatePostDto {
  @IsNotEmpty()
  caption: string;

  imageUrl: string;

  @IsNotEmpty()
  tag: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  visibility: Visibility;
}
