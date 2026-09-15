import { OrderModel } from '../models/order.model.js';

export async function seedOrders() {
  await OrderModel.bulkCreate([
    { clientId: 1, orderDate: new Date(), status: 'PENDING' },
    { clientId: 2, orderDate: new Date(), status: 'COMPLETED' },
  ]);
}
