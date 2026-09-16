import { BranchModel } from '../models/branch.model.js';

export async function seedBranches(): Promise<void> {
  await BranchModel.bulkCreate([
    { name: 'Sucursal Principal', description: 'Sucursal central', isActive: true },
    { name: 'Sucursal Norte', description: 'Sucursal ubicada al norte', isActive: true },
  ]);
}
