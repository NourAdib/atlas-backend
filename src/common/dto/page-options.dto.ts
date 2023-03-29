import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../constants/order.enum';

/**
 * PageOptionsDto
 * @description Page options DTO, used for pagination and is passed by the frontend
 * @description The default values are set to 1, 10 and ASC
 */
export class PageOptionsDto {
  /**
   * @description The order of the results
   */
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  /**
   * @description The page number
   */
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  /**
   * @description The number of results per page
   */
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  /**
   * @description The number of results to skip
   */
  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
