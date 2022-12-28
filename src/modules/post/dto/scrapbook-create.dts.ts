import { IsNotEmpty } from 'class-validator';
import { Visibility } from 'src/constants/visibility.enum';
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

  @IsNotEmpty()
  visibility: Visibility;
}
