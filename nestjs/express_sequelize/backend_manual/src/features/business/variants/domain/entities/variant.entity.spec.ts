import { Variant } from './variant.entity.js';

describe('Variant Entity', () => {
  it('should create a valid variant', () => {
    const variant = Variant.create({
      productId: 1,
      name: 'Talla M',
      description: 'Variante mediana',
    });
    expect(variant.name).toBe('Talla M');
    expect(variant.isActive).toBe(true);
  });

  it('should update variant', () => {
    const variant = Variant.create({
      productId: 1,
      name: 'Talla M',
    });
    variant.update({ name: 'Talla L', isActive: false });
    expect(variant.name).toBe('Talla L');
    expect(variant.isActive).toBe(false);
  });
});
