import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
  @ApiPropertyOptional({ example: 1 })
  collectionId?: number;

  @ApiPropertyOptional({ example: 1 })
  productTypeId?: number;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  status?: string;
}
