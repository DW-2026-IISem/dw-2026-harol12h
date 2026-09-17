export interface ReturnDetailProps {
    id?: number;
    returnId: number;
    productId: number;
    quantity: number;
    reason: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class ReturnDetail {
    id?: number;
    returnId: number;
    productId: number;
    quantity: number;
    reason: string;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ReturnDetailProps, 'id' | 'createdAt' | 'updatedAt'>): ReturnDetail;
    static reconstitute(props: ReturnDetailProps): ReturnDetail;
}
