import { ReturnDetailModel } from '../models/return-detail.model.js';
export async function seedReturnDetails() {
    await ReturnDetailModel.bulkCreate([
        { returnId: 1, productId: 2, quantity: 1, reason: 'Producto defectuoso' },
        { returnId: 2, productId: 3, quantity: 2, reason: 'Cambio de talla' },
    ]);
}
//# sourceMappingURL=return-details.seeder.js.map