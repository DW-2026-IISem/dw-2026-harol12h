import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export class ProductNotFoundException extends DomainException {
    constructor(id) {
        super(`El producto con ID ${id} no existe.`);
    }
}
//# sourceMappingURL=product-not-found.exception.js.map