import { Product } from '../../domain/entities/product.entity.js';
import { ProductModel } from '../../infrastructure/persistence/models/product.model.js';
import { Status } from '../../../../../common/enums/status.enum.js';
export declare class ProductMapper {
    static toDomain(model: ProductModel): Product;
    static toPersistence(entity: Product): {
        id: number | undefined;
        name: string;
        brand: string;
        price: number;
        minStock: number;
        quantity: number;
        productTypeId: number;
        collectionId: number;
        status: Status;
    };
    static toResponse(model: ProductModel): {
        id: any;
        name: string;
        brand: string;
        price: number;
        minStock: number;
        quantity: number;
        productTypeId: number;
        collectionId: number;
        status: string;
        createdAt: any;
        updatedAt: any;
    };
}
