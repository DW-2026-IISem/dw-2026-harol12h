import { Variant } from '../../../domain/entities/variant.entity.js';
import { VariantResponseDto } from '../../../application/dto/variant-response.dto.js';
import { VariantMapper } from '../../../application/mappers/variant.mapper.js';

export class VariantSerializer {
  static serialize(entity: Variant): VariantResponseDto {
    return VariantMapper.toResponse(entity);
  }
}
