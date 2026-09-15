import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export class OrderNotFoundException extends DomainException {
    constructor(id) {
        super(`El pedido con ID ${id} no existe.`);
    }
}
//# sourceMappingURL=order-not-found.exception.js.map