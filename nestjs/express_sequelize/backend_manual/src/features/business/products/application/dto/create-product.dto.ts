import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Status } from '../../../../../common/enums/status.enum.js';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone X' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({ example: 'TechBrand' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  brand: string;

  @ApiProperty({ example: 59999 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(0)
  minStock: number;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productTypeId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  collectionId: number;

  @ApiProperty({ enum: Status, example: Status.ACTIVE, required: false })
  @IsEnum(Status)
  status?: Status;
}
