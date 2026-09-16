import { Module } from '@nestjs/common';
import { VARIANT_REPOSITORY } from './domain/interfaces/variant-repository.interface.js';
import { VariantRepository } from './infrastructure/persistence/repositories/variant.repository.js';
import { CreateVariantUseCase } from './application/use-cases/create-variant.use-case.js';
import { UpdateVariantUseCase } from './application/use-cases/update-variant.use-case.js';
import { DeleteVariantUseCase } from './application/use-cases/delete-variant.use-case.js';
import { GetVariantUseCase } from './application/use-cases/get-variant.use-case.js';
import { ListVariantsUseCase } from './application/use-cases/list-variants.use-case.js';
import { VariantsController } from './presentation/http/controllers/variants.controller.js';

@Module({
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
export class VariantsModule {}
