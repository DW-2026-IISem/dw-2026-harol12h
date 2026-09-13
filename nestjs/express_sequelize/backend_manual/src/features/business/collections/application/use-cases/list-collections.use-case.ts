import { Inject, Injectable } from '@nestjs/common';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface';
import { CollectionFilterDto } from '../dto/collection-filter.dto';
import { CollectionMapper } from '../mappers/collection.mapper';

@Injectable()
export class ListCollectionsUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: ICollectionRepository,
  ) {}

  async execute(filter: CollectionFilterDto) {
    const result = await this.collectionRepository.findAll(filter);
    return {
      items: result.items.map((c) => CollectionMapper.toResponse(c)),
      meta: result.meta,
    };
  }
}
