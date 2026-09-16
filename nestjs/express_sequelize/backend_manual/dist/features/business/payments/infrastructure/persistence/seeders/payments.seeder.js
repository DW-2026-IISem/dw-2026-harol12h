import { PaymentModel } from '../models/payment.model.js';
export async function seedPayments() {
    await PaymentModel.bulkCreate([
        { orderId: 1, method: 'tarjeta', amount: 250.0, status: 'completed' },
        { orderId: 2, method: 'efectivo', amount: 120.5, status: 'pending' },
    ]);
}
//# sourceMappingURL=payments.seeder.js.map