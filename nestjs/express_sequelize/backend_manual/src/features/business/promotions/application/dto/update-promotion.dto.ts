import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePromotionDto {
  @ApiPropertyOptional({ example: 'Descuento de verano' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '20% en toda la tienda' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  discountPercentage?: number;

  @ApiPropertyOptional({ example: '2026-09-16' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2026-10-16' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
