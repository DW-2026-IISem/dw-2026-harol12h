export class ReturnDetailUpdatedEvent {
    id;
    returnId;
    productId;
    quantity;
    reason;
    updatedAt;
    constructor(id, returnId, productId, quantity, reason, updatedAt) {
        this.id = id;
        this.returnId = returnId;
        this.productId = productId;
        this.quantity = quantity;
        this.reason = reason;
        this.updatedAt = updatedAt;
    }
}
//# sourceMappingURL=return-detail-updated.event.js.map