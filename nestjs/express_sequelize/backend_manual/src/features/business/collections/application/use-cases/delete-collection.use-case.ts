import { Inject, Injectable } from '@nestjs/common';
import { CollectionNotFoundException } from '../../domain/exceptions/collection-not-found.exception';
import {
  type ICollectionRepository,
  COLLECTION_REPOSITORY,
} from '../../domain/interfaces/collection-repository.interface';

@Injectable()
export class DeleteCollectionUseCase {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: ICollectionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new CollectionNotFoundException(id);
    }

    await this.collectionRepository.delete(id);
  }
}
