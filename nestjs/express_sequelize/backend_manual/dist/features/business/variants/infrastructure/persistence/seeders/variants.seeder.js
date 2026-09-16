import { VariantModel } from '../models/variant.model.js';
export async function seedVariants() {
    await VariantModel.bulkCreate([
        { productId: 1, name: 'Talla M', description: 'Mediana', isActive: true },
        { productId: 1, name: 'Talla L', description: 'Grande', isActive: true },
    ]);
}
//# sourceMappingURL=variants.seeder.js.map