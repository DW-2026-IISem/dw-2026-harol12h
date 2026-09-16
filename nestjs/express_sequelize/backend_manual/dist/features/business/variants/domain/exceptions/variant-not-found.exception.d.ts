import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class VariantNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
