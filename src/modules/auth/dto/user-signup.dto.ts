import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

/**
 * This is the DTO for the user sign up,
 * this is the data that the user will send to the server in the body of the request.
 * The annotation above each property is used to validate the data that the user sends.
 * Nest Validates it automatically and if the data is not valid it will throw an error.
 * IsNotEmpty check that the string is not empty.
 */

export class SignUpUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsPhoneNumber('AE')
  phoneNumber: string;

  address: string;

  @IsNotEmpty()
  dateOfBirth: Date;
}
