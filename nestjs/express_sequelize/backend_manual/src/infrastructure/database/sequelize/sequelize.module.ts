import { Module } from '@nestjs/common';
import { createSequelizeInstance } from './sequelize.factory.js';
import { getSequelizeOptions } from './sequelize.options.js';

@Module({
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const options = getSequelizeOptions();
        const sequelize = await createSequelizeInstance(options);
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
  exports: ['SEQUELIZE'],
})
export class SequelizeDatabaseModule {}
