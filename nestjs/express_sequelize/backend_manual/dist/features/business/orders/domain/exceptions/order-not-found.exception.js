import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class OrderNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Pedido', id);
    }
}
//# sourceMappingURL=order-not-found.exception.js.map