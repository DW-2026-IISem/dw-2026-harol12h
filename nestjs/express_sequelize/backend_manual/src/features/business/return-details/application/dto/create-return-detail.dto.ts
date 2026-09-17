import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateReturnDetailDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  returnId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Producto defectuoso' })
  @IsString()
  reason: string;
}
