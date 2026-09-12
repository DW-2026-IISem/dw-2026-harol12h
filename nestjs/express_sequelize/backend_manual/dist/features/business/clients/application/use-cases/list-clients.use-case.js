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
import { CLIENT_REPOSITORY, } from '../../domain/interfaces/client-repository.interface.js';
import { ClientMapper } from '../mappers/client.mapper.js';
let ListClientsUseCase = class ListClientsUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(filter) {
        const result = await this.clientRepository.findAll(filter);
        return {
            items: result.items.map((client) => ClientMapper.toResponse(client)),
            meta: result.meta,
        };
    }
};
ListClientsUseCase = __decorate([
    Injectable(),
    __param(0, Inject(CLIENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListClientsUseCase);
export { ListClientsUseCase };
//# sourceMappingURL=list-clients.use-case.js.map