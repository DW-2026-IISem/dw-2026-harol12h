import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class VariantNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Variante', id);
    }
}
//# sourceMappingURL=variant-not-found.exception.js.map