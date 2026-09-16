import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsString, IsDateString } from 'class-validator';

export class CreateReturnDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  orderId: number;

  @ApiProperty({ example: '2026-09-16' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 'Producto defectuoso' })
  @IsString()
  reason: string;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;
}
