import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class CollectionNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
