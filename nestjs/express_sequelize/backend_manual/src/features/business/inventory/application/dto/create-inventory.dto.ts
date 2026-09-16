import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  branchId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  variantId: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  quantity: number;
}
