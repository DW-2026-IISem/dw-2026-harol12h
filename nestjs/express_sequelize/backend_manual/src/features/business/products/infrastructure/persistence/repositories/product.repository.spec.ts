import { Sequelize } from 'sequelize-typescript';
import { ProductRepository } from './product.repository.js';
import { Product } from '../../../domain/entities/product.entity.js';
import { ProductModel } from '../models/product.model.js';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });

    repository = new ProductRepository();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const product = Product.create({
      name: 'Phone',
      brand: 'TechBrand',
      price: 500,
      minStock: 2,
      quantity: 20,
      productTypeId: 1,
    });

    const created = await repository.create(product);
    expect(created.name).toBe('Phone');
  });
});
