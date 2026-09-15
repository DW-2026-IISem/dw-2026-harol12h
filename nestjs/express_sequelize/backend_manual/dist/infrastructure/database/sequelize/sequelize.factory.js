import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { getSequelizeOptions } from './sequelize.options.js';
export const ALL_MODELS = [ClientModel, CollectionModel, ProductModel];
export function createSequelizeInstance(dialect) {
    const sequelize = new Sequelize({
        ...getSequelizeOptions(dialect),
        models: ALL_MODELS,
    });
    CollectionModel.hasMany(ProductModel, { foreignKey: 'collectionId' });
    ProductModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' });
    return sequelize;
}
//# sourceMappingURL=sequelize.factory.js.map