import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class PaymentNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Pago', id);
  }
}
