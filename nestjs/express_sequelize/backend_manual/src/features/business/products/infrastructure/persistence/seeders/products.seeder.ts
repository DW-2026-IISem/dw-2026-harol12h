import { ProductModel } from '../models/product.model.js';

export async function seedProducts() {
  await ProductModel.bulkCreate([
    {
      name: 'Camisa Blanca',
      brand: 'ModaCo',
      price: 50000,
      minStock: 5,
      quantity: 20,
      productTypeId: 1,
      collectionId: 1,
      status: 'ACTIVE',
    },
    {
      name: 'Pantalón Jeans',
      brand: 'DenimCo',
      price: 120000,
      minStock: 3,
      quantity: 15,
      productTypeId: 2,
      collectionId: 1,
      status: 'ACTIVE',
    },
  ]);
}
