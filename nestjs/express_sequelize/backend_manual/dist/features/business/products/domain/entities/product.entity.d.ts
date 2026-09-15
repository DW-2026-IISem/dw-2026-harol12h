import { Status } from '../../../../../common/enums/status.enum.js';
export interface ProductProps {
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    collectionId: number;
    status?: Status;
}
export declare class Product {
    readonly id: number | null;
    readonly name: string;
    readonly brand: string;
    readonly price: number;
    readonly minStock: number;
    readonly quantity: number;
    readonly productTypeId: number;
    readonly collectionId: number;
    readonly status: Status;
    private constructor();
    static create(props: ProductProps): Product;
}
