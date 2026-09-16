import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class BranchNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
