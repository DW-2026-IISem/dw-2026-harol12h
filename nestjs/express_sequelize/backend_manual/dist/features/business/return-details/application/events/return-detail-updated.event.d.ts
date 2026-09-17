export declare class ReturnDetailUpdatedEvent {
    readonly id: number;
    readonly returnId: number;
    readonly productId: number;
    readonly quantity: number;
    readonly reason: string;
    readonly updatedAt: Date;
    constructor(id: number, returnId: number, productId: number, quantity: number, reason: string, updatedAt: Date);
}
