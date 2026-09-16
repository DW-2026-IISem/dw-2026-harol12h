import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  orderId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  unitPrice: number;
}
