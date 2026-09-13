import { Injectable, OnModuleInit } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder.js';
import { seedCollections } from '../../../features/business/collections/infrastructure/persistence/seeders/collections.seeder.js';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') return;

    await seedClients();
    await seedCollections();
  }
}
