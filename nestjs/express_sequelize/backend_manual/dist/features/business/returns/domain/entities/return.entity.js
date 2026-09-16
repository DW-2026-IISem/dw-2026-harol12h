export class Return {
    id;
    orderId;
    date;
    reason;
    total;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.orderId = props.orderId;
        this.date = props.date;
        this.reason = props.reason;
        this.total = props.total;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.total < 0)
            throw new Error('El total no puede ser negativo');
        return new Return(props);
    }
    static reconstitute(props) {
        return new Return(props);
    }
}
//# sourceMappingURL=return.entity.js.map