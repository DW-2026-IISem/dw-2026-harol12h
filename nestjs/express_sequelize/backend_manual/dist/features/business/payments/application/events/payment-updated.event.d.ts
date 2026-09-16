export declare class PaymentUpdatedEvent {
    readonly id: number;
    readonly orderId: number;
    readonly method: string;
    readonly amount: number;
    readonly status: string;
    readonly updatedAt: Date;
    constructor(id: number, orderId: number, method: string, amount: number, status: string, updatedAt: Date);
}
