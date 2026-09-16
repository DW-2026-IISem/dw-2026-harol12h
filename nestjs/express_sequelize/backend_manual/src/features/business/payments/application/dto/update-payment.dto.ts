import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, IsString, IsOptional } from 'class-validator';

export class UpdatePaymentDto {
  @ApiPropertyOptional({ example: 'efectivo' })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiPropertyOptional({ example: 120.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({ example: 'completed' })
  @IsOptional()
  @IsString()
  status?: string;
}
