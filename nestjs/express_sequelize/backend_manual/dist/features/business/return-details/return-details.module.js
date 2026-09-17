var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ReturnDetailsController } from './presentation/http/controllers/return-details.controller.js';
import { ReturnDetailRepository } from './infrastructure/persistence/repositories/return-detail.repository.js';
import { CreateReturnDetailUseCase } from './application/use-cases/create-return-detail.usecase.js';
import { UpdateReturnDetailUseCase } from './application/use-cases/update-return-detail.usecase.js';
import { DeleteReturnDetailUseCase } from './application/use-cases/delete-return-detail.usecase.js';
import { FindReturnDetailUseCase } from './application/use-cases/find-return-detail.use-case.js';
import { ListReturnDetailsUseCase } from './application/use-cases/list-return-details.usecase.js';
import { RETURN_DETAIL_REPOSITORY } from './domain/interfaces/return-detail-repository.interface.js';
let ReturnDetailsModule = class ReturnDetailsModule {
};
ReturnDetailsModule = __decorate([
    Module({
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
], ReturnDetailsModule);
export { ReturnDetailsModule };
//# sourceMappingURL=return-details.module.js.map