import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class ReturnNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
