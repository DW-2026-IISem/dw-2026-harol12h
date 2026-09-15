import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export declare class OrderNotFoundException extends DomainException {
    constructor(id: number);
}
