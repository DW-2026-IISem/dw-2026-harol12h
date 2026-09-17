import { Module } from '@nestjs/common';
import { ReturnDetailsController } from './presentation/http/controllers/return-details.controller.js';
import { ReturnDetailRepository } from './infrastructure/persistence/repositories/return-detail.repository.js';
import { CreateReturnDetailUseCase } from './application/use-cases/create-return-detail.usecase.js';
import { UpdateReturnDetailUseCase } from './application/use-cases/update-return-detail.usecase.js';
import { DeleteReturnDetailUseCase } from './application/use-cases/delete-return-detail.usecase.js';
import { FindReturnDetailUseCase } from './application/use-cases/find-return-detail.use-case.js';
import { ListReturnDetailsUseCase } from './application/use-cases/list-return-details.usecase.js';
import { RETURN_DETAIL_REPOSITORY } from './domain/interfaces/return-detail-repository.interface.js';

@Module({
  controllers: [ReturnDetailsController],
  providers: [
    { provide: RETURN_DETAIL_REPOSITORY, useClass: ReturnDetailRepository },
    CreateReturnDetailUseCase,
    UpdateReturnDetailUseCase,
    DeleteReturnDetailUseCase,
    FindReturnDetailUseCase,
    ListReturnDetailsUseCase,
  ],
})
export class ReturnDetailsModule {}
