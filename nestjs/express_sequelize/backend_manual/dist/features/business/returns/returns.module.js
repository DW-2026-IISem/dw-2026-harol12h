var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ReturnsController } from './presentation/http/controllers/returns.controller.js';
import { ReturnRepository } from './infrastructure/persistence/repositories/return.repository.js';
import { CreateReturnUseCase } from './application/use-cases/create-return.usecase.js';
import { UpdateReturnUseCase } from './application/use-cases/update-return.usecase.js';
import { DeleteReturnUseCase } from './application/use-cases/delete-return.usecase.js';
import { FindReturnUseCase } from './application/use-cases/find-return.usecase.js';
import { ListReturnsUseCase } from './application/use-cases/list-returns.usecase.js';
import { RETURN_REPOSITORY } from './domain/interfaces/return-repository.interface.js';
let ReturnsModule = class ReturnsModule {
};
ReturnsModule = __decorate([
    Module({
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
], ReturnsModule);
export { ReturnsModule };
//# sourceMappingURL=returns.module.js.map