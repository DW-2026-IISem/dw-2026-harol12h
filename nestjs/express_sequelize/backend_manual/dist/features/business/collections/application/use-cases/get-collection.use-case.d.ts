import { type ICollectionRepository } from '../../domain/interfaces/collection-repository.interface.js';
export declare class GetCollectionUseCase {
    private readonly collectionRepository;
    constructor(collectionRepository: ICollectionRepository);
    execute(id: number): Promise<import("../dto/collection-response.dto.js").CollectionResponseDto>;
}
