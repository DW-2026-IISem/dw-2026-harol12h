export declare class Order {
    readonly id: number | null;
    readonly clientId: number;
    readonly orderDate: Date;
    readonly status: string;
    constructor(id: number | null, clientId: number, orderDate: Date, status: string);
    static create(props: {
        clientId: number;
        orderDate: Date;
        status: string;
    }): Order;
}
