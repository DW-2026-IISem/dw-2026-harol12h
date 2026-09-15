import { Model } from 'sequelize-typescript';
export declare class OrderModel extends Model {
    clientId: number;
    orderDate: Date;
    status: string;
}
