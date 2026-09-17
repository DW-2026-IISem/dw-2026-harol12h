import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class ReturnDetailNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Detalle de devolución', id);
    }
}
//# sourceMappingURL=return-detail-not-found.exception.js.map