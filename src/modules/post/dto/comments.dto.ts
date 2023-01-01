import { IsNotEmpty, IsString } from 'class-validator';

export class commentDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  comment: string;
}
