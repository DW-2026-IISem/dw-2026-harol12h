import type { IVariantRepository } from '../../domain/interfaces/variant-repository.interface.js';
export declare class DeleteVariantUseCase {
    private readonly variantRepository;
    constructor(variantRepository: IVariantRepository);
    execute(id: number): Promise<void>;
}
