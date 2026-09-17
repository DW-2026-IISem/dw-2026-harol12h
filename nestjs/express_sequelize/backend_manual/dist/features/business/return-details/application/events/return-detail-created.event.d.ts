export declare class ReturnDetailCreatedEvent {
    readonly id: number;
    readonly returnId: number;
    readonly productId: number;
    readonly quantity: number;
    readonly reason: string;
    readonly createdAt: Date;
    constructor(id: number, returnId: number, productId: number, quantity: number, reason: string, createdAt: Date);
}
