import { Model } from 'sequelize-typescript';
export declare class BranchModel extends Model {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
