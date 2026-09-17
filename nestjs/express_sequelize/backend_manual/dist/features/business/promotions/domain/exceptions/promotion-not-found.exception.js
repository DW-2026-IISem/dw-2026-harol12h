import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class PromotionNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Promoción', id);
    }
}
//# sourceMappingURL=promotion-not-found.exception.js.map