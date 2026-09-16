import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateReturnDto {
  @ApiPropertyOptional({ example: '2026-09-16' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional({ example: 'Cambio de talla' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ example: 120.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  total?: number;

  @ApiPropertyOptional({ example: 'completed' })
  @IsOptional()
  @IsString()
  status?: string;
}
