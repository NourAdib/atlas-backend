import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
/**
 * Data transfer object for clue
 */
export class CreateClueDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
