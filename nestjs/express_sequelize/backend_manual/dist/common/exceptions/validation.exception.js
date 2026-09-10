import { ApplicationException } from './application.exception.js';
export class ValidationException extends ApplicationException {
    constructor(message = 'Error de validación') {
        super(message, 422);
    }
}
//# sourceMappingURL=validation.exception.js.map