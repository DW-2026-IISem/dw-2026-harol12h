export class PaymentCreatedEvent {
    id;
    orderId;
    method;
    amount;
    status;
    createdAt;
    constructor(id, orderId, method, amount, status, createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.method = method;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=payment-created.event.js.map