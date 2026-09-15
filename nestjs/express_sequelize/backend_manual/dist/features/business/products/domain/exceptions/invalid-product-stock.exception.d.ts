import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export declare class InvalidProductStockException extends DomainException {
    constructor(stock: number);
}
