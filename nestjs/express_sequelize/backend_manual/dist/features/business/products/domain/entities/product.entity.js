import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
import { Status } from '../../../../../common/enums/status.enum.js';
export class Product {
    id;
    name;
    brand;
    price;
    minStock;
    quantity;
    productTypeId;
    collectionId;
    status;
    constructor(id, name, brand, price, minStock, quantity, productTypeId, collectionId, status) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.minStock = minStock;
        this.quantity = quantity;
        this.productTypeId = productTypeId;
        this.collectionId = collectionId;
        this.status = status;
        if (price <= 0)
            throw new DomainException('Precio inválido');
        if (minStock < 0)
            throw new DomainException('Stock mínimo inválido');
    }
    static create(props) {
        return new Product(null, props.name, props.brand, props.price, props.minStock, props.quantity, props.productTypeId, props.collectionId, props.status ?? Status.ACTIVE);
    }
}
//# sourceMappingURL=product.entity.js.map