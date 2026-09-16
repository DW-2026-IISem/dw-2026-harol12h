export class PaymentUpdatedEvent {
    id;
    orderId;
    method;
    amount;
    status;
    updatedAt;
    constructor(id, orderId, method, amount, status, updatedAt) {
        this.id = id;
        this.orderId = orderId;
        this.method = method;
        this.amount = amount;
        this.status = status;
        this.updatedAt = updatedAt;
    }
}
//# sourceMappingURL=payment-updated.event.js.map