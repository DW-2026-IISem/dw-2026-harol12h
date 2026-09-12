import { Inject, Injectable } from '@nestjs/common';
import { Collection } from '../../domain/entities/collection.entity';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { CollectionMapper } from '../mappers/collection.mapper';

@Injectable()
export class CreateCollectionUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: ICollectionRepository,
  ) {}

  async execute(dto: CreateCollectionDto) {
    const collection = Collection.create(dto);
    const created = await this.collectionRepository.create(collection);
    return CollectionMapper.toResponse(created);
  }
}
