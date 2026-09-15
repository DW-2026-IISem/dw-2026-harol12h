import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export declare class ProductNotFoundException extends DomainException {
    constructor(id: number);
}
