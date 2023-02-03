import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
/**
 * to check for valid date while updating dates
 */
export class UpdateUserBioDto {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  bio: string;
}
