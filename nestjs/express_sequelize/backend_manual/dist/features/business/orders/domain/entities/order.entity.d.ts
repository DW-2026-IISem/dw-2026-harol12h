export interface OrderProps {
    id?: number;
    clientId: number;
    orderDate: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Order {
    id?: number;
    clientId: number;
    orderDate: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<OrderProps, 'id' | 'createdAt' | 'updatedAt'>): Order;
    static reconstitute(props: OrderProps): Order;
    updateStatus(status: string): void;
}
