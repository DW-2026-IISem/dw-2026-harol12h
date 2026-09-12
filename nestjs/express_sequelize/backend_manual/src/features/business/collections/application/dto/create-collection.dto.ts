import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ example: 'Primavera-Verano' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Colección de temporada primavera-verano' })
  @IsOptional()
  @IsString()
  description?: string;
}
