import { BranchRepository } from './branch.repository.js';
import { Branch } from '../../../domain/entities/branch.entity.js';

describe('BranchRepository', () => {
  let repository: BranchRepository;

  beforeEach(() => {
    repository = new BranchRepository();
  });

  it('should create a branch', async () => {
    const branch = Branch.create({ name: 'Sucursal Principal' });
    const created = await repository.create(branch);
    expect(created.name).toBe('Sucursal Principal');
  });
});
