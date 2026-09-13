import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module.js';
import { CollectionsModule } from './collections/collections.module.js';

@Module({
  imports: [ClientsModule, CollectionsModule],
  exports: [ClientsModule, CollectionsModule],
})
export class BusinessModule {}
