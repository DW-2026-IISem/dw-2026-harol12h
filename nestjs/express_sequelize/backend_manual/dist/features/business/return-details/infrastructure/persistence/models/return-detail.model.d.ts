import { Model } from 'sequelize-typescript';
export declare class ReturnDetailModel extends Model {
    id: number;
    returnId: number;
    productId: number;
    quantity: number;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}
