import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../../../common/enums/status.enum';

export class ProductResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Smartphone X' })
  name: string;

  @ApiProperty({ example: 'TechBrand' })
  brand: string;

  @ApiProperty({ example: 59999 })
  price: number;

  @ApiProperty({ example: 5 })
  minStock: number;

  @ApiProperty({ example: 50 })
  quantity: number;

  @ApiProperty({ example: 1 })
  productTypeId: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
