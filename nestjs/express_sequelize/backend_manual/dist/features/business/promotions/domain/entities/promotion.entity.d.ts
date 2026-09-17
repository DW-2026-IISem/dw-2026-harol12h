export interface PromotionProps {
    id?: number;
    name: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Promotion {
    id?: number;
    name: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<PromotionProps, 'id' | 'createdAt' | 'updatedAt'>): Promotion;
    static reconstitute(props: PromotionProps): Promotion;
}
