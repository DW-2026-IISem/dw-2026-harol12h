import { Model } from 'sequelize-typescript';
export declare class PaymentModel extends Model {
    id: number;
    orderId: number;
    method: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
