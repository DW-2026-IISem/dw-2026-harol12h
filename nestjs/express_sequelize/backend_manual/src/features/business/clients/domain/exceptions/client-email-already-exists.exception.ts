export class ClientEmailAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`El email '${email}' ya está registrado`);
    this.name = 'ClientEmailAlreadyExistsException';
  }
}
