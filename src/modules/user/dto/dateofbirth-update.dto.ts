import { IsNotEmpty } from 'class-validator';
/**
 * to check for valid date while updating dates
 */
export class UpdateUserDateOfBirthDto {
  @IsNotEmpty()
  dateOfBirth: Date;
}
