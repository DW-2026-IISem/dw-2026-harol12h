import { type ICollectionRepository } from '../../domain/interfaces/collection-repository.interface.js';
import { CreateCollectionDto } from '../dto/create-collection.dto.js';
export declare class CreateCollectionUseCase {
    private readonly collectionRepository;
    constructor(collectionRepository: ICollectionRepository);
    execute(dto: CreateCollectionDto): Promise<import("../dto/collection-response.dto.js").CollectionResponseDto>;
}
