import { Model } from 'sequelize-typescript';
export declare class VariantModel extends Model {
    id: number;
    productId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
