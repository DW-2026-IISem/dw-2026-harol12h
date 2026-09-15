import { Model } from 'sequelize-typescript';
export declare class ProductModel extends Model {
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    collectionId: number;
    status: string;
}
