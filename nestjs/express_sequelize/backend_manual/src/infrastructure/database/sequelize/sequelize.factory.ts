import { ClientModel } from '../../../features/business/clients/infrastructure/persistence/models/client.model.js';
import { CollectionModel } from '../../../features/business/collections/infrastructure/persistence/models/collection.model.js';
import { ProductModel } from '../../../features/business/products/infrastructure/persistence/models/product.model.js';
import { ProductTypeModel } from '../../../features/business/product-types/infrastructure/persistence/models/product-type.model.js';

export const ALL_MODELS = [
  ClientModel,
  CollectionModel,
  ProductTypeModel,
  ProductModel, // ✅ nuevo
];

// Asociaciones
CollectionModel.hasMany(ProductModel, { foreignKey: 'collectionId' });
ProductModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' });

ProductTypeModel.hasMany(ProductModel, { foreignKey: 'productTypeId' });
ProductModel.belongsTo(ProductTypeModel, { foreignKey: 'productTypeId' });
