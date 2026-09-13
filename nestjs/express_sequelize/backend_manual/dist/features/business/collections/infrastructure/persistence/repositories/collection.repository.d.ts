import { Collection } from '../../../domain/entities/collection.entity.js';
import { ICollectionRepository, CollectionFindAllParams } from '../../../domain/interfaces/collection-repository.interface.js';
export declare class CollectionRepository implements ICollectionRepository {
    create(collection: Collection): Promise<Collection>;
    update(collection: Collection): Promise<Collection>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Collection | null>;
    findAll(params: CollectionFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface.js").PaginatedResult<Collection>>;
}
