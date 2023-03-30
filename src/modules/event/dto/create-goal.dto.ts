import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
/**
 * Data transfer object for goal
 */
export class CreateGoalDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
