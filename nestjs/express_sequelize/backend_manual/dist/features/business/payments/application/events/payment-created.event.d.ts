export declare class PaymentCreatedEvent {
    readonly id: number;
    readonly orderId: number;
    readonly method: string;
    readonly amount: number;
    readonly status: string;
    readonly createdAt: Date;
    constructor(id: number, orderId: number, method: string, amount: number, status: string, createdAt: Date);
}
