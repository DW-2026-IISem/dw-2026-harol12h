import { VariantRepository } from './variant.repository.js';
import { Variant } from '../../../domain/entities/variant.entity.js';

describe('VariantRepository', () => {
  let repository: VariantRepository;

  beforeEach(() => {
    repository = new VariantRepository();
  });

  it('should create a variant', async () => {
    const variant = Variant.create({
      productId: 1,
      name: 'Talla M',
    });
    const created = await repository.create(variant);
    expect(created.productId).toBe(1);
    expect(created.name).toBe('Talla M');
  });
});
