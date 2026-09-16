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
import { VARIANT_REPOSITORY } from '../../domain/interfaces/variant-repository.interface.js';
import { VariantMapper } from '../mappers/variant.mapper.js';
let ListVariantsUseCase = class ListVariantsUseCase {
    variantRepository;
    constructor(variantRepository) {
        this.variantRepository = variantRepository;
    }
    async execute(filter) {
        const result = await this.variantRepository.findAll(filter);
        return {
            items: result.items.map((v) => VariantMapper.toResponse(v)),
            meta: result.meta,
        };
    }
};
ListVariantsUseCase = __decorate([
    Injectable(),
    __param(0, Inject(VARIANT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListVariantsUseCase);
export { ListVariantsUseCase };
//# sourceMappingURL=list-variants.use-case.js.map