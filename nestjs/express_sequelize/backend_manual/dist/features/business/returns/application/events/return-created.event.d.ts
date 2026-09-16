export declare class ReturnCreatedEvent {
    readonly id: number;
    readonly orderId: number;
    readonly date: Date;
    readonly reason: string;
    readonly total: number;
    readonly status: string;
    readonly createdAt: Date;
    constructor(id: number, orderId: number, date: Date, reason: string, total: number, status: string, createdAt: Date);
}
