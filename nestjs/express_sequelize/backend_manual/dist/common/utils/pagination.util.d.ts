import { PaginatedResult } from '../interfaces/pagination.interface.js';
export declare function normalizePagination(page?: number, limit?: number): {
    page: number;
    limit: number;
    offset: number;
};
export declare function buildPaginatedResult<T>(items: T[], total: number, page: number, limit: number): PaginatedResult<T>;
