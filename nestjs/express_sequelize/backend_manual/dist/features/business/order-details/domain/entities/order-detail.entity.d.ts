export interface OrderDetailProps {
    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class OrderDetail {
    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<OrderDetailProps, 'id' | 'createdAt' | 'updatedAt'>): OrderDetail;
    static reconstitute(props: OrderDetailProps): OrderDetail;
    update(props: Partial<Omit<OrderDetailProps, 'id'>>): void;
}
