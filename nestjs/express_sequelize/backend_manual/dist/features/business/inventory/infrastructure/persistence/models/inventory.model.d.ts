import { Model } from 'sequelize-typescript';
export declare class InventoryModel extends Model {
    id: number;
    branchId: number;
    variantId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
