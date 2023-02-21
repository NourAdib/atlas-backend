import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

/**
 * This is the DTO for creating a post
 */
export class GetProximityMemoryDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
