import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class OrderNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
