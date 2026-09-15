import { Model } from 'sequelize-typescript';
export declare class OrderModel extends Model {
    id: number;
    clientId: number;
    orderDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
