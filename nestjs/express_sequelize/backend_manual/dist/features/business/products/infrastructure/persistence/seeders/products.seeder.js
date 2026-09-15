import { ProductModel } from '../models/product.model.js';
import { Status } from '../../../../../../common/enums/status.enum.js';
export async function seedProducts() {
    const count = await ProductModel.count();
    if (count > 0)
        return;
    await ProductModel.bulkCreate([
        {
            name: 'Smartphone X',
            brand: 'TechBrand',
            price: 59999,
            minStock: 5,
            quantity: 50,
            productTypeId: 1,
            status: Status.ACTIVE,
        },
        {
            name: 'Wireless Headphones',
            brand: 'AudioPro',
            price: 12999,
            minStock: 10,
            quantity: 100,
            productTypeId: 1,
            status: Status.ACTIVE,
        },
    ]);
}
//# sourceMappingURL=products.seeder.js.map