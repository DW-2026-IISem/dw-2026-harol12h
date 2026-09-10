import { ApplicationException } from './application.exception.js';
export class DomainException extends ApplicationException {
    constructor(message) {
        super(message, 400);
    }
}
//# sourceMappingURL=domain.exception.js.map