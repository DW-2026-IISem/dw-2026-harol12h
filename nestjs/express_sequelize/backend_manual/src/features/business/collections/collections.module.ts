import { Module } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from './domain/interfaces/collection-repository.interface.js';
import { CollectionRepository } from './infrastructure/persistence/repositories/collection.repository.js';
import { CreateCollectionUseCase } from './application/use-cases/create-collection.use-case.js';
import { UpdateCollectionUseCase } from './application/use-cases/update-collection.use-case.js';
import { DeleteCollectionUseCase } from './application/use-cases/delete-collection.use-case.js';
import { GetCollectionUseCase } from './application/use-cases/get-collection.use-case.js';
import { ListCollectionsUseCase } from './application/use-cases/list-collections.use-case.js';
import { CollectionsController } from './presentation/http/controllers/collections.controller.js';

@Module({
  controllers: [CollectionsController],
  providers: [
    CollectionRepository,
    { provide: COLLECTION_REPOSITORY, useExisting: CollectionRepository },
    CreateCollectionUseCase,
    UpdateCollectionUseCase,
    DeleteCollectionUseCase,
    GetCollectionUseCase,
    ListCollectionsUseCase,
  ],
  exports: [COLLECTION_REPOSITORY],
})
export class CollectionsModule {}
