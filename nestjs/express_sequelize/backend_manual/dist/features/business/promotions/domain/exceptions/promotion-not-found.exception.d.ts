import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export declare class PromotionNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
