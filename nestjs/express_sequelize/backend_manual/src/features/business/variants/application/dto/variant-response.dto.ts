import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 'Talla M' })
  name: string;

  @ApiPropertyOptional({ example: 'Variante de talla mediana' })
  description?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
