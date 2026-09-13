import { Inject, Injectable } from '@nestjs/common';
import { CollectionNotFoundException } from '../../domain/exceptions/collection-not-found.exception.js';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface.js';
import { UpdateCollectionDto } from '../dto/update-collection.dto.js';
import { CollectionMapper } from '../mappers/collection.mapper.js';

@Injectable()
export class UpdateCollectionUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: ICollectionRepository,
  ) {}

  async execute(id: number, dto: UpdateCollectionDto) {
    const collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new CollectionNotFoundException(id);
    }

    collection.update(dto);
    const updated = await this.collectionRepository.update(collection);
    return CollectionMapper.toResponse(updated);
  }
}
