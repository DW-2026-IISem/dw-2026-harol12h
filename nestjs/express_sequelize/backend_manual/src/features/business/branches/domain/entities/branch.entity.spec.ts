import { Branch } from './branch.entity.js';

describe('Branch Entity', () => {
  it('should create a valid branch', () => {
    const branch = Branch.create({ name: 'Sucursal Principal' });
    expect(branch.name).toBe('Sucursal Principal');
    expect(branch.isActive).toBe(true);
  });

  it('should update branch', () => {
    const branch = Branch.create({ name: 'Sucursal Principal' });
    branch.update({ name: 'Sucursal Norte', isActive: false });
    expect(branch.name).toBe('Sucursal Norte');
    expect(branch.isActive).toBe(false);
  });
});
