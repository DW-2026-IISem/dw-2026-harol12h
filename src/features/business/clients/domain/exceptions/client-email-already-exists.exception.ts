import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class ClientEmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`El email '${email}' ya está registrado`);
  }
}
