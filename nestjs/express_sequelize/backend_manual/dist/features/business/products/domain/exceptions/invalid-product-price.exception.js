import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export class InvalidProductPriceException extends DomainException {
    constructor(price) {
        super(`El precio '${price}' no es válido`);
    }
}
//# sourceMappingURL=invalid-product-price.exception.js.map