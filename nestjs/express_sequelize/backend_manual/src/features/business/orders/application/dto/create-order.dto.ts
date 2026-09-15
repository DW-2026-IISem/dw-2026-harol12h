import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: '2026-09-14' })
  orderDate: Date;

  @ApiProperty({ example: 'PENDING' })
  status: string;
}
