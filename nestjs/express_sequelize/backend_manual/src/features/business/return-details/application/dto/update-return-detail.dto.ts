import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, Min, IsOptional } from 'class-validator';

export class UpdateReturnDetailDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  productId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({ example: 'Cambio de talla' })
  @IsOptional()
  @IsString()
  reason?: string;
}
