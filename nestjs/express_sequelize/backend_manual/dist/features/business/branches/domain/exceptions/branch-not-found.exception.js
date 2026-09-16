import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class BranchNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Sucursal', id);
    }
}
//# sourceMappingURL=branch-not-found.exception.js.map