import { ListBranchesUseCase } from './list-branches.use-case.js';
import { Branch } from '../../domain/entities/branch.entity.js';
import type { IBranchRepository } from '../../domain/interfaces/branch-repository.interface.js';

class MockBranchRepository implements IBranchRepository {
  async create(branch: Branch): Promise<Branch> { return branch; }
  async update(branch: Branch): Promise<Branch> { return branch; }
  async delete(id: number): Promise<void> {}
  async findById(id: number): Promise<Branch | null> { return null; }
  async findAll(): Promise<any> { return { items: [Branch.create({ name: 'Sucursal Principal' })], meta: {} }; }
}

describe('ListBranchesUseCase', () => {
  it('should list branches', async () => {
    const repo = new MockBranchRepository();
    const useCase = new ListBranchesUseCase(repo as any);
    const result = await useCase.execute({});
    expect(result.items[0].name).toBe('Sucursal Principal');
  });
});
