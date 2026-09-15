import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export class InvalidProductStockException extends DomainException {
    constructor(stock) {
        super(`El stock '${stock}' no puede ser negativo`);
    }
}
//# sourceMappingURL=invalid-product-stock.exception.js.map