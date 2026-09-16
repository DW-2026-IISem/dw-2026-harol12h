import { ReturnModel } from '../models/return.model.js';
export async function seedReturns() {
    await ReturnModel.bulkCreate([
        { orderId: 1, date: new Date(), reason: 'Producto defectuoso', total: 50.0, status: 'completed' },
        { orderId: 2, date: new Date(), reason: 'Cambio de talla', total: 120.5, status: 'pending' },
    ]);
}
//# sourceMappingURL=returns.seeder.js.map