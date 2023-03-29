import { IsEnum, IsNotEmpty } from 'class-validator';
import { Visibility } from '../../../constants/visibility.enum';

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

  @IsEnum(Visibility)
  @IsNotEmpty()
  visibility: Visibility;
}
