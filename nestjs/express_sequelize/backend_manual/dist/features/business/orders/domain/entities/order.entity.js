export class Order {
    id;
    clientId;
    orderDate;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.clientId = props.clientId;
        this.orderDate = props.orderDate;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.clientId)
            throw new Error('El pedido debe tener cliente');
        if (!props.orderDate)
            throw new Error('El pedido debe tener fecha');
        return new Order(props);
    }
    static reconstitute(props) {
        return new Order(props);
    }
    updateStatus(status) {
        this.status = status;
    }
}
//# sourceMappingURL=order.entity.js.map