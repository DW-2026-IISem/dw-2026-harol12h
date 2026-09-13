import { type ICollectionRepository } from '../../domain/interfaces/collection-repository.interface.js';
import { CollectionFilterDto } from '../dto/collection-filter.dto.js';
export declare class ListCollectionsUseCase {
    private readonly collectionRepository;
    constructor(collectionRepository: ICollectionRepository);
    execute(filter: CollectionFilterDto): Promise<{
        items: import("../dto/collection-response.dto.js").CollectionResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
}
