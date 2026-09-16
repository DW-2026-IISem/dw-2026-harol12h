import { Module } from '@nestjs/common';
import { ReturnsController } from './presentation/http/controllers/returns.controller.js';
import { ReturnRepository } from './infrastructure/persistence/repositories/return.repository.js';
import { CreateReturnUseCase } from './application/use-cases/create-return.usecase.js';
import { UpdateReturnUseCase } from './application/use-cases/update-return.usecase.js';
import { DeleteReturnUseCase } from './application/use-cases/delete-return.usecase.js';
import { FindReturnUseCase } from './application/use-cases/find-return.usecase.js';
import { ListReturnsUseCase } from './application/use-cases/list-returns.usecase.js';
import { RETURN_REPOSITORY } from './domain/interfaces/return-repository.interface.js';

@Module({
  controllers: [ReturnsController],
  providers: [
    { provide: RETURN_REPOSITORY, useClass: ReturnRepository },
    CreateReturnUseCase,
    UpdateReturnUseCase,
    DeleteReturnUseCase,
    FindReturnUseCase,
    ListReturnsUseCase,
  ],
})
export class ReturnsModule {}
