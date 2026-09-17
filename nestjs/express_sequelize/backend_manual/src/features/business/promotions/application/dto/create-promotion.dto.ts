import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsDateString, IsBoolean } from 'class-validator';

export class CreatePromotionDto {
  @ApiProperty({ example: 'Descuento de verano' })
  @IsString()
  name: string;

  @ApiProperty({ example: '20% en toda la tienda' })
  @IsString()
  description: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(1)
  @Max(100)
  discountPercentage: number;

  @ApiProperty({ example: '2026-09-16' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2026-10-16' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  active: boolean;
}
