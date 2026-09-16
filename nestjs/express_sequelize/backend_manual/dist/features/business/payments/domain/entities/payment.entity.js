export class Payment {
    id;
    orderId;
    method;
    amount;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.orderId = props.orderId;
        this.method = props.method;
        this.amount = props.amount;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.amount <= 0)
            throw new Error('El monto debe ser mayor a cero');
        return new Payment(props);
    }
    static reconstitute(props) {
        return new Payment(props);
    }
}
//# sourceMappingURL=payment.entity.js.map