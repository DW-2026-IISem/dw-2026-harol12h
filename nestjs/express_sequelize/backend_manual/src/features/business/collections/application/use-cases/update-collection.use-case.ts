import { Inject, Injectable } from '@nestjs/common';
import { CollectionNotFoundException } from '../../domain/exceptions/collection-not-found.exception';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface';
import { UpdateCollectionDto } from '../dto/update-collection.dto';
import { CollectionMapper } from '../mappers/collection.mapper';

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
