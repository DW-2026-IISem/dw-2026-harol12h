import { Status } from '../../../../../common/enums/status.enum.js';
import { InvalidProductPriceException } from '../exceptions/invalid-product-price.exception.js';
import { InvalidProductStockException } from '../exceptions/invalid-product-stock.exception.js';
import { isValidPrice } from '../validators/product-price.validator.js';
import { isValidStock } from '../validators/product-stock.validator.js';
export class Product {
    id;
    name;
    brand;
    price;
    minStock;
    quantity;
    productTypeId;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.brand = props.brand;
        this.price = props.price;
        this.minStock = props.minStock;
        this.quantity = props.quantity;
        this.productTypeId = props.productTypeId;
        this.status = props.status ?? Status.ACTIVE;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.name?.trim())
            throw new Error('El nombre del producto es requerido');
        if (!props.brand?.trim())
            throw new Error('La marca del producto es requerida');
        if (!isValidPrice(props.price))
            throw new InvalidProductPriceException(props.price);
        if (!isValidStock(props.quantity))
            throw new InvalidProductStockException(props.quantity);
        if (!isValidStock(props.minStock))
            throw new InvalidProductStockException(props.minStock);
        return new Product(props);
    }
    static reconstitute(props) {
        return new Product(props);
    }
    update(props) {
        if (props.name !== undefined) {
            if (!props.name.trim())
                throw new Error('El nombre del producto es requerido');
            this.name = props.name;
        }
        if (props.brand !== undefined) {
            if (!props.brand.trim())
                throw new Error('La marca del producto es requerida');
            this.brand = props.brand;
        }
        if (props.price !== undefined) {
            if (!isValidPrice(props.price))
                throw new InvalidProductPriceException(props.price);
            this.price = props.price;
        }
        if (props.minStock !== undefined) {
            if (!isValidStock(props.minStock))
                throw new InvalidProductStockException(props.minStock);
            this.minStock = props.minStock;
        }
        if (props.quantity !== undefined) {
            if (!isValidStock(props.quantity))
                throw new InvalidProductStockException(props.quantity);
            this.quantity = props.quantity;
        }
        if (props.productTypeId !== undefined) {
            this.productTypeId = props.productTypeId;
        }
    }
    deactivate() {
        this.status = Status.INACTIVE;
    }
    reduceStock(amount) {
        const newQuantity = this.quantity - amount;
        if (!isValidStock(newQuantity))
            throw new InvalidProductStockException(newQuantity);
        this.quantity = newQuantity;
    }
}
//# sourceMappingURL=product.entity.js.map