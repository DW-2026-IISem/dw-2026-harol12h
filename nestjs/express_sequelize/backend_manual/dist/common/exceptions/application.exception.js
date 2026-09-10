export class ApplicationException extends Error {
    message;
    statusCode;
    timestamp;
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=application.exception.js.map