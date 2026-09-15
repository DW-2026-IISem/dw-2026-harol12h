import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export declare class InvalidProductPriceException extends DomainException {
    constructor(price: number);
}
