import { Module } from '@nestjs/common';
import { getSequelizeOptions } from './sequelize.options.js';
import { Sequelize } from 'sequelize-typescript';

@Module({
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const options = getSequelizeOptions();
        return new Sequelize(options);
      },
    },
  ],
  exports: ['SEQUELIZE'],
})
export class SequelizeDatabaseModule {}
