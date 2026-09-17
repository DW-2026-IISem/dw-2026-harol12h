import { Model } from 'sequelize-typescript';
export declare class PromotionModel extends Model {
    id: number;
    name: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
