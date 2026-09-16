export interface PaymentProps {
    id?: number;
    orderId: number;
    method: string;
    amount: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Payment {
    id?: number;
    orderId: number;
    method: string;
    amount: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<PaymentProps, 'id' | 'createdAt' | 'updatedAt'>): Payment;
    static reconstitute(props: PaymentProps): Payment;
}
