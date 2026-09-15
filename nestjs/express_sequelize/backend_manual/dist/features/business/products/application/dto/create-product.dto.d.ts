import { Status } from '../../../../../common/enums/status.enum.js';
export declare class CreateProductDto {
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    collectionId: number;
    status?: Status;
}
