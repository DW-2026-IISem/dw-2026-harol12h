import { Inject, Injectable } from '@nestjs/common';
import { CollectionNotFoundException } from '../../domain/exceptions/collection-not-found.exception';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface';
import { CollectionMapper } from '../mappers/collection.mapper';

@Injectable()
export class GetCollectionUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: ICollectionRepository,
  ) {}

  async execute(id: number) {
    const collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new CollectionNotFoundException(id);
    }

    return CollectionMapper.toResponse(collection);
  }
}
