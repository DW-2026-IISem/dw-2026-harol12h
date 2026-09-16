var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { VARIANT_REPOSITORY } from './domain/interfaces/variant-repository.interface.js';
import { VariantRepository } from './infrastructure/persistence/repositories/variant.repository.js';
import { CreateVariantUseCase } from './application/use-cases/create-variant.use-case.js';
import { UpdateVariantUseCase } from './application/use-cases/update-variant.use-case.js';
import { DeleteVariantUseCase } from './application/use-cases/delete-variant.use-case.js';
import { GetVariantUseCase } from './application/use-cases/get-variant.use-case.js';
import { ListVariantsUseCase } from './application/use-cases/list-variants.use-case.js';
import { VariantsController } from './presentation/http/controllers/variants.controller.js';
let VariantsModule = class VariantsModule {
};
VariantsModule = __decorate([
    Module({
        controllers: [VariantsController],
        providers: [
            VariantRepository,
            { provide: VARIANT_REPOSITORY, useExisting: VariantRepository },
            CreateVariantUseCase,
            UpdateVariantUseCase,
            DeleteVariantUseCase,
            GetVariantUseCase,
            ListVariantsUseCase,
        ],
        exports: [VARIANT_REPOSITORY],
    })
], VariantsModule);
export { VariantsModule };
//# sourceMappingURL=variants.module.js.map