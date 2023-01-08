import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from 'src/constants/order.enum';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
