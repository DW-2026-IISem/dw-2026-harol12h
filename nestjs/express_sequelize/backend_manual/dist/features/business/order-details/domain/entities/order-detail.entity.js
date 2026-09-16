export class OrderDetail {
    id;
    orderId;
    productId;
    quantity;
    unitPrice;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.orderId = props.orderId;
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.unitPrice = props.unitPrice;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.quantity <= 0)
            throw new Error('La cantidad debe ser mayor a cero');
        if (props.unitPrice <= 0)
            throw new Error('El precio unitario debe ser mayor a cero');
        return new OrderDetail(props);
    }
    static reconstitute(props) {
        return new OrderDetail(props);
    }
    update(props) {
        if (props.quantity !== undefined)
            this.quantity = props.quantity;
        if (props.unitPrice !== undefined)
            this.unitPrice = props.unitPrice;
    }
}
//# sourceMappingURL=order-detail.entity.js.map