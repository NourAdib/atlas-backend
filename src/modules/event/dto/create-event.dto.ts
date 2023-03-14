import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  Max,
  Min
} from 'class-validator';
import { Visibility } from 'src/constants/visibility.enum';
import { CreateClueDto } from './create-clue.dto';
import { CreateGoalDto } from './create-goal.dto';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  @Max(100)
  numberOfParticipants: number;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsEnum(Visibility)
  @IsNotEmpty()
  visibility: Visibility;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  goal: CreateGoalDto;

  @IsArray()
  @IsOptional()
  clues: CreateClueDto[];
}
