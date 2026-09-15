import { Status } from '../../../../../common/enums/status.enum.js';
export declare class ProductResponseDto {
    id: number;
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
