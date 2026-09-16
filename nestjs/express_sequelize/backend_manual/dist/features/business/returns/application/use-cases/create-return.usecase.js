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
import { Injectable, Inject } from '@nestjs/common';
import { Return } from '../../domain/entities/return.entity.js';
import { RETURN_REPOSITORY } from '../../domain/interfaces/return-repository.interface.js';
let CreateReturnUseCase = class CreateReturnUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(props) {
        const returnEntity = Return.create(props);
        return this.repository.create(returnEntity);
    }
};
CreateReturnUseCase = __decorate([
    Injectable(),
    __param(0, Inject(RETURN_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateReturnUseCase);
export { CreateReturnUseCase };
//# sourceMappingURL=create-return.usecase.js.map