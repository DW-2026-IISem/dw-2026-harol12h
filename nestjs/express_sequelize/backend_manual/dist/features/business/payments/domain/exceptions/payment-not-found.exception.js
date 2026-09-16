import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class PaymentNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Pago', id);
    }
}
//# sourceMappingURL=payment-not-found.exception.js.map