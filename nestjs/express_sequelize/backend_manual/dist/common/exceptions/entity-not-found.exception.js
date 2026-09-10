import { ApplicationException } from './application.exception.js';
export class EntityNotFoundException extends ApplicationException {
    constructor(entityName, identifier) {
        super(`${entityName} con ID ${identifier} no encontrado`, 404);
    }
}
//# sourceMappingURL=entity-not-found.exception.js.map