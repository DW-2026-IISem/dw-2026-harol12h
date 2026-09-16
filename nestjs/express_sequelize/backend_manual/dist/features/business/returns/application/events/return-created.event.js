export class ReturnCreatedEvent {
    id;
    orderId;
    date;
    reason;
    total;
    status;
    createdAt;
    constructor(id, orderId, date, reason, total, status, createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.date = date;
        this.reason = reason;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=return-created.event.js.map