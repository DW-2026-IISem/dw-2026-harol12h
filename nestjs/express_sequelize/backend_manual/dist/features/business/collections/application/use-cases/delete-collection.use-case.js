var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { CollectionNotFoundException } from '../../domain/exceptions/collection-not-found.exception.js';
import { COLLECTION_REPOSITORY, } from '../../domain/interfaces/collection-repository.interface.js';
let DeleteCollectionUseCase = class DeleteCollectionUseCase {
    collectionRepository;
    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }
    async execute(id) {
        const collection = await this.collectionRepository.findById(id);
        if (!collection) {
            throw new CollectionNotFoundException(id);
        }
        await this.collectionRepository.delete(id);
    }
};
DeleteCollectionUseCase = __decorate([
    Injectable(),
    __param(0, Inject(COLLECTION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteCollectionUseCase);
export { DeleteCollectionUseCase };
//# sourceMappingURL=delete-collection.use-case.js.map