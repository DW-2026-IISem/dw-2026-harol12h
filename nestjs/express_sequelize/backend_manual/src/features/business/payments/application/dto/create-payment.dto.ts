import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  orderId: number;

  @ApiProperty({ example: 'tarjeta' })
  @IsString()
  method: string;

  @ApiProperty({ example: 250.0 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;
}
