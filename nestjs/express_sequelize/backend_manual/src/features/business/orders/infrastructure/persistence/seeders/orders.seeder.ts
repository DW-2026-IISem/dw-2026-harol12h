import { OrderModel } from '../models/order.model';

export async function seedOrders(): Promise<void> {
  const count = await OrderModel.count();
  if (count > 0) return;

  await OrderModel.bulkCreate([
    {
      clientId: 1,
      orderDate: new Date(),
      status: 'PENDING',
    },
    {
      clientId: 2,
      orderDate: new Date(),
      status: 'COMPLETED',
    },
  ]);
}
