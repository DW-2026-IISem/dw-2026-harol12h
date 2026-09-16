import { Model } from 'sequelize-typescript';
export declare class ReturnModel extends Model {
    id: number;
    orderId: number;
    date: Date;
    reason: string;
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
