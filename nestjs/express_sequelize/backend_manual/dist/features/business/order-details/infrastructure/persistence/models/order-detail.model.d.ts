import { Model } from 'sequelize-typescript';
export declare class OrderDetailModel extends Model {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
