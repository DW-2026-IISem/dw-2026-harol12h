import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class PaymentNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
