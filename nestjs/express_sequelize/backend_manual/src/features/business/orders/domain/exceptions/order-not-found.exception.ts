import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class OrderNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Pedido', id);
  }
}
