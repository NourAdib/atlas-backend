import { IsEnum, IsNotEmpty } from 'class-validator';
import { Visibility } from '../../../constants/visibility.enum';
import { Post } from '../entities/post.entity';

/**
 * This is the DTO for creating a scrapbook
 */
export class CreateScrapBookDto {
  @IsNotEmpty()
  caption: string;

  //Optional field
  posts: Post[];

  @IsNotEmpty()
  location: string;

  @IsEnum(Visibility)
  @IsNotEmpty()
  visibility: Visibility;
}
