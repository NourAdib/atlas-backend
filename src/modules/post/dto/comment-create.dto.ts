import { IsNotEmpty, MaxLength } from 'class-validator';
/**
 * Data transfer object for creating a comment
 */
export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(100)
  text: string;
}
