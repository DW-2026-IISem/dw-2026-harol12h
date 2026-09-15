import { Model } from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum.js';
export declare class ProductModel extends Model {
    id: number;
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
