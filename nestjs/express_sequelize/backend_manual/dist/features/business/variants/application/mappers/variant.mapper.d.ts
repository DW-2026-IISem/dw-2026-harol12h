import { Variant } from '../../domain/entities/variant.entity.js';
import { VariantResponseDto } from '../dto/variant-response.dto.js';
import { VariantModel } from '../../infrastructure/persistence/models/variant.model.js';
export declare class VariantMapper {
    static toDomain(model: VariantModel): Variant;
    static toResponse(entity: Variant): VariantResponseDto;
    static toPersistence(entity: Variant): Partial<VariantModel>;
}
