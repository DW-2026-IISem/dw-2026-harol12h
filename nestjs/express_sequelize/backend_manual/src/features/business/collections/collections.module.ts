import { Module } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from './domain/interfaces/collection-repository.interface';
import { CollectionRepository } from './infrastructure/persistence/repositories/collection.repository';
import { CreateCollectionUseCase } from './application/use-cases/create-collection.use-case';
import { UpdateCollectionUseCase } from './application/use-cases/update-collection.use-case';
import { DeleteCollectionUseCase } from './application/use-cases/delete-collection.use-case';
import { GetCollectionUseCase } from './application/use-cases/get-collection.use-case';
import { ListCollectionsUseCase } from './application/use-cases/list-collections.use-case';
import { CollectionsController } from './presentation/http/controllers/collections.controller';

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
