import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class PostAnalyticResposneDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  commentCount: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  likeCount: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  interactionCount: number;

  @IsBoolean()
  @IsNotEmpty()
  isTakenDown: boolean;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  reportCount: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  appealCount: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsBoolean()
  @IsNotEmpty()
  isPartOfScrapbook: boolean;

  @IsOptional()
  @IsUUID()
  scrapbookId: string;
}
