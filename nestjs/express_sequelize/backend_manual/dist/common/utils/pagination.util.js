import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, } from '../constants/pagination.constants.js';
export function normalizePagination(page, limit) {
    const safePage = !page || page < 1 ? DEFAULT_PAGE : page;
    const safeLimit = !limit || limit < 1 ? DEFAULT_LIMIT : Math.min(limit, MAX_LIMIT);
    const offset = (safePage - 1) * safeLimit;
    return { page: safePage, limit: safeLimit, offset };
}
export function buildPaginatedResult(items, total, page, limit) {
    return {
        items,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 0,
        },
    };
}
//# sourceMappingURL=pagination.util.js.map