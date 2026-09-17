export class ReturnDetailCreatedEvent {
    id;
    returnId;
    productId;
    quantity;
    reason;
    createdAt;
    constructor(id, returnId, productId, quantity, reason, createdAt) {
        this.id = id;
        this.returnId = returnId;
        this.productId = productId;
        this.quantity = quantity;
        this.reason = reason;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=return-detail-created.event.js.map