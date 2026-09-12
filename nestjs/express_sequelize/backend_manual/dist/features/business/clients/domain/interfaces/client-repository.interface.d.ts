export declare const CLIENT_REPOSITORY = "CLIENT_REPOSITORY";
export interface PaginatedResult<T> {
    items: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface IClientRepository {
    findById(id: number): Promise<any | null>;
    findAll(filter?: any): Promise<PaginatedResult<any>>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<any | null>;
}
