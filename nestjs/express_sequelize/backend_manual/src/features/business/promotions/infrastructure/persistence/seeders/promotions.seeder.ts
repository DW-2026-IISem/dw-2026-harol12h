import { PromotionModel } from '../models/promotion.model.js';

export async function seedPromotions(): Promise<void> {
  await PromotionModel.bulkCreate([
    {
      name: 'Descuento de verano',
      description: '20% en toda la tienda',
      discountPercentage: 20,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      active: true,
    },
    {
      name: 'Black Friday',
      description: '50% en productos seleccionados',
      discountPercentage: 50,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      active: true,
    },
  ]);
}
