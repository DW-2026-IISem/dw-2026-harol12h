import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';
export class CollectionNotFoundException extends EntityNotFoundException {
    constructor(id) {
        super('Colección', id);
    }
}
//# sourceMappingURL=collection-not-found.exception.js.map