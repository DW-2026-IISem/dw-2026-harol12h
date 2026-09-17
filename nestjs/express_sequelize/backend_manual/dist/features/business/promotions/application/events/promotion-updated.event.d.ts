export declare class PromotionUpdatedEvent {
    readonly id: number;
    readonly name: string;
    readonly discountPercentage: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly active: boolean;
    readonly updatedAt: Date;
    constructor(id: number, name: string, discountPercentage: number, startDate: Date, endDate: Date, active: boolean, updatedAt: Date);
}
