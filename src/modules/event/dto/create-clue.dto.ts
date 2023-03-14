import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

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
