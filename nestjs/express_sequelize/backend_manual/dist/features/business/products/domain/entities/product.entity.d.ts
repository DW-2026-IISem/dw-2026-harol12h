import { Status } from '../../../../../common/enums/status.enum.js';
export interface ProductProps {
    id?: number;
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Product {
    id?: number;
    name: string;
    brand: string;
    price: number;
    minStock: number;
    quantity: number;
    productTypeId: number;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ProductProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Product;
    static reconstitute(props: ProductProps): Product;
    update(props: Partial<Omit<ProductProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
    reduceStock(amount: number): void;
}
