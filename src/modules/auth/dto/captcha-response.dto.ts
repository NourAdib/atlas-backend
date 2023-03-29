/**
 * reCAPTCHA response Data Transfer Object
 */
export class ReCaptchaResponseDto {
  success: boolean;

  challenge_ts: string;

  hostname: string;
}
