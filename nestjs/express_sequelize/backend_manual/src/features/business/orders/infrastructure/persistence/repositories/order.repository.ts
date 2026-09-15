import { Injectable } from '@nestjs/common';
import { OrderModel } from '../models/order.model.js';
import { Order } from '../../../domain/entities/order.entity.js';

@Injectable()
export class OrderRepository {
  async create(order: Order): Promise<OrderModel> {
    return await OrderModel.create(order as any);
  }

  async findById(id: number): Promise<OrderModel | null> {
    return await OrderModel.findByPk(id);
  }

  async findAll(): Promise<OrderModel[]> {
    return await OrderModel.findAll();
  }

  async update(order: Order): Promise<OrderModel> {
    const existing = await OrderModel.findByPk(order.id!);
    if (!existing) throw new Error('Order not found');
    return await existing.update(order as any);
  }

  async delete(id: number): Promise<void> {
    const existing = await OrderModel.findByPk(id);
    if (existing) await existing.destroy();
  }
}
