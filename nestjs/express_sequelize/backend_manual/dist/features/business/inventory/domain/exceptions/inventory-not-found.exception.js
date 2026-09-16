import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class InventoryNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Inventario', id);
    }
}
//# sourceMappingURL=inventory-not-found.exception.js.map