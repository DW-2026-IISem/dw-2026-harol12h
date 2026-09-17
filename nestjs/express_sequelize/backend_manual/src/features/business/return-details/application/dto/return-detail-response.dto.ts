import { ApiProperty } from '@nestjs/swagger';

export class ReturnDetailResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  returnId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
