import { Status } from '../../../../../common/enums/status.enum.js';
export interface ClientProps {
    id?: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Client {
    static create(arg0: {
        name: string;
        address: string | undefined;
        phone: string | undefined;
        email: string;
        password: string;
    }): void;
    static reconstitute(arg0: {
        id: number;
        name: string;
        address: string | undefined;
        phone: string | undefined;
        email: string | undefined;
        password: string | undefined;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }): Client;
    id?: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(props: ClientProps);
}
