import { IsPhoneNumber } from 'class-validator';
/**
 * to check for valid date while updating dates
 */
export class UpdateUserPhoneNumberDto {
  @IsPhoneNumber('AE')
  phoneNumber: string;
}
