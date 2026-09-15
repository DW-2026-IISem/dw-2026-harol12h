import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  clientId: number;

  @ApiProperty({ example: '2026-09-15' })
  @IsDateString()
  orderDate: Date;

  @ApiProperty({ example: 'PENDING' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
