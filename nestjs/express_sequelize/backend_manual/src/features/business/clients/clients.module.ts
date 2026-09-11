import { Module } from '@nestjs/common';
import { BcryptPasswordHasherService } from '../../../infrastructure/security/hashing/bcrypt-password-hasher.service';
import { PASSWORD_HASHER } from '../../../infrastructure/security/hashing/password-hasher.interface';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface';
import { ClientRepository } from './infrastructure/persistence/repositories/client.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from './application/use-cases/delete-client.use-case';
import { GetClientUseCase } from './application/use-cases/get-client.use-case';
import { ListClientsUseCase } from './application/use-cases/list-clients.use-case';
import { ClientsController } from './presentation/http/controllers/clients.controller';

@Module({
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
export class ClientsModule {}
