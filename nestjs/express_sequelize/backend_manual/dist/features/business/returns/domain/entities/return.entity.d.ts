export interface ReturnProps {
    id?: number;
    orderId: number;
    date: Date;
    reason: string;
    total: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Return {
    id?: number;
    orderId: number;
    date: Date;
    reason: string;
    total: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ReturnProps, 'id' | 'createdAt' | 'updatedAt'>): Return;
    static reconstitute(props: ReturnProps): Return;
}
