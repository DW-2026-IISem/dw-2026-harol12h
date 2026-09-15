import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class ProductNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
