import { Variant } from '../../../domain/entities/variant.entity.js';
import { VariantResponseDto } from '../../../application/dto/variant-response.dto.js';
export declare class VariantSerializer {
    static serialize(entity: Variant): VariantResponseDto;
}
