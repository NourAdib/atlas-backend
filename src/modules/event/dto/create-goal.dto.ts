import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

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
