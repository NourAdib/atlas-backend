import { IsNotEmpty } from 'class-validator';
import { ReportReason } from 'src/constants/report-reason.enum';

/**
 * This is the DTO for creating a reports for both user and post
 */
export class ReportDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  reason: ReportReason;
}
