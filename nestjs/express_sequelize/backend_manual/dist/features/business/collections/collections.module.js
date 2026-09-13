var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from './domain/interfaces/collection-repository.interface.js';
import { CollectionRepository } from './infrastructure/persistence/repositories/collection.repository.js';
import { CreateCollectionUseCase } from './application/use-cases/create-collection.use-case.js';
import { UpdateCollectionUseCase } from './application/use-cases/update-collection.use-case.js';
import { DeleteCollectionUseCase } from './application/use-cases/delete-collection.use-case.js';
import { GetCollectionUseCase } from './application/use-cases/get-collection.use-case.js';
import { ListCollectionsUseCase } from './application/use-cases/list-collections.use-case.js';
import { CollectionsController } from './presentation/http/controllers/collections.controller.js';
let CollectionsModule = class CollectionsModule {
};
CollectionsModule = __decorate([
    Module({
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
], CollectionsModule);
export { CollectionsModule };
//# sourceMappingURL=collections.module.js.map