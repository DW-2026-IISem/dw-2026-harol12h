export class ReturnDetail {
    id;
    returnId;
    productId;
    quantity;
    reason;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.returnId = props.returnId;
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.reason = props.reason;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.quantity <= 0)
            throw new Error('La cantidad debe ser mayor a cero');
        return new ReturnDetail(props);
    }
    static reconstitute(props) {
        return new ReturnDetail(props);
    }
}
//# sourceMappingURL=return-detail.entity.js.map