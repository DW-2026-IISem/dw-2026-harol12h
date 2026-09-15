import { Status } from '../../../../../common/enums/status.enum.js';
export declare class ProductSwagger {
    id: number;
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    collectionId: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
