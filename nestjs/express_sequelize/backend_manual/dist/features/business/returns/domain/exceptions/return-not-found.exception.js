import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class ReturnNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Devolución', id);
    }
}
//# sourceMappingURL=return-not-found.exception.js.map