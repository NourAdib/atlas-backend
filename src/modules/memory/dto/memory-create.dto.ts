import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Visibility } from '../../../constants/visibility.enum';

/**
 * This is the DTO for creating a post
 */
export class CreateMemoryDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  location: string;

  @IsEnum(Visibility)
  @IsNotEmpty()
  visibility: Visibility;
}
