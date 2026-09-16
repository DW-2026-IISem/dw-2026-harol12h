import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
import { CreateVariantDto } from '../dto/create-variant.dto.js';
export declare class CreateVariantUseCase {
    private readonly variantRepository;
    constructor(variantRepository: IVariantRepository);
    execute(dto: CreateVariantDto): Promise<import("../dto/variant-response.dto.js").VariantResponseDto>;
}
