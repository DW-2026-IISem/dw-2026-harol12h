import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class ReturnDetailNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
