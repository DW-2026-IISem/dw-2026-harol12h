import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class ProductNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Producto', id);
    }
}
//# sourceMappingURL=product-not-found.exception.js.map