import { DomainException } from '../../../../../common/exceptions/domain.exception.js';

export class OrderNotFoundException extends DomainException {
  constructor(id: number) {
    super(`El pedido con ID ${id} no existe.`);
  }
}
