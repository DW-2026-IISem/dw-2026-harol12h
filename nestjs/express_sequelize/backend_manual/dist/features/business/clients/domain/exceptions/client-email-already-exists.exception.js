export class ClientEmailAlreadyExistsException extends Error {
    constructor(email) {
        super(`El email '${email}' ya está registrado`);
        this.name = 'ClientEmailAlreadyExistsException';
    }
}
//# sourceMappingURL=client-email-already-exists.exception.js.map