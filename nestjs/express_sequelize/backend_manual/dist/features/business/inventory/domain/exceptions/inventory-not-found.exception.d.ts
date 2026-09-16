import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class InventoryNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
