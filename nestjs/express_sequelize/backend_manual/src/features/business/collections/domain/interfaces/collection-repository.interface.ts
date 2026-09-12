import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Collection } from '../entities/collection.entity';

export const COLLECTION_REPOSITORY = 'COLLECTION_REPOSITORY';

export interface CollectionFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICollectionRepository {
  create(collection: Collection): Promise<Collection>;
  update(collection: Collection): Promise<Collection>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Collection | null>;
  findAll(
    params: CollectionFindAllParams,
  ): Promise<PaginatedResult<Collection>>;
}
