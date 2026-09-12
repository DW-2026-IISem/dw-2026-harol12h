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
import { PASSWORD_HASHER, } from '../../../../../infrastructure/security/hashing/password-hasher.interface.js';
import { ClientEmailAlreadyExistsException } from '../../domain/exceptions/client-email-already-exists.exception.js';
import { Client } from '../../domain/entities/client.entity.js';
import { CLIENT_REPOSITORY, } from '../../domain/interfaces/client-repository.interface.js';
import { ClientMapper } from '../mappers/client.mapper.js';
let CreateClientUseCase = class CreateClientUseCase {
    clientRepository;
    passwordHasher;
    constructor(clientRepository, passwordHasher) {
        this.clientRepository = clientRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(dto) {
        if (dto.email) {
            const existing = await this.clientRepository.findByEmail(dto.email);
            if (existing) {
                throw new ClientEmailAlreadyExistsException(dto.email);
            }
        }
        let password = dto.password;
        if (password) {
            password = await this.passwordHasher.hash(password);
        }
        const client = Client.create({
            name: dto.name,
            address: dto.address,
            phone: dto.phone,
            email: dto.email,
            password,
        });
        const created = await this.clientRepository.create(client);
        return ClientMapper.toResponse(created);
    }
};
CreateClientUseCase = __decorate([
    Injectable(),
    __param(0, Inject(CLIENT_REPOSITORY)),
    __param(1, Inject(PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object, Object])
], CreateClientUseCase);
export { CreateClientUseCase };
//# sourceMappingURL=create-client.use-case.js.map