import { type ICollectionRepository } from '../../domain/interfaces/collection-repository.interface.js';
import { UpdateCollectionDto } from '../dto/update-collection.dto.js';
export declare class UpdateCollectionUseCase {
    private readonly collectionRepository;
    constructor(collectionRepository: ICollectionRepository);
    execute(id: number, dto: UpdateCollectionDto): Promise<import("../dto/collection-response.dto.js").CollectionResponseDto>;
}
