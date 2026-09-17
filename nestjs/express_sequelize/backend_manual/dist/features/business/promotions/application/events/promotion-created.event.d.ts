export declare class PromotionCreatedEvent {
    readonly id: number;
    readonly name: string;
    readonly discountPercentage: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly active: boolean;
    readonly createdAt: Date;
    constructor(id: number, name: string, discountPercentage: number, startDate: Date, endDate: Date, active: boolean, createdAt: Date);
}
