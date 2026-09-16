import { OrderDetailModel } from '../models/order-detail.model.js';

export async function seedOrderDetails(): Promise<void> {
  await OrderDetailModel.bulkCreate([
    { orderId: 1, productId: 1, quantity: 2, unitPrice: 50 },
    { orderId: 1, productId: 2, quantity: 1, unitPrice: 100 },
  ]);
}
