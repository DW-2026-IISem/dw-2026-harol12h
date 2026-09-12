var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { BcryptPasswordHasherService } from '../../../infrastructure/security/hashing/bcrypt-password-hasher.service.js';
import { PASSWORD_HASHER } from '../../../infrastructure/security/hashing/password-hasher.interface.js';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface.js';
import { ClientRepository } from './infrastructure/persistence/repositories/client.repository.js';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case.js';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case.js';
import { DeleteClientUseCase } from './application/use-cases/delete-client.use-case.js';
import { GetClientUseCase } from './application/use-cases/get-client.use-case.js';
import { ListClientsUseCase } from './application/use-cases/list-clients.use-case.js';
import { ClientsController } from './presentation/http/controllers/clients.controller.js';
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    Module({
        controllers: [ClientsController],
        providers: [
            ClientRepository,
            { provide: CLIENT_REPOSITORY, useExisting: ClientRepository },
            BcryptPasswordHasherService,
            { provide: PASSWORD_HASHER, useExisting: BcryptPasswordHasherService },
            CreateClientUseCase,
            UpdateClientUseCase,
            DeleteClientUseCase,
            GetClientUseCase,
            ListClientsUseCase,
        ],
        exports: [CLIENT_REPOSITORY],
    })
], ClientsModule);
export { ClientsModule };
//# sourceMappingURL=clients.module.js.map