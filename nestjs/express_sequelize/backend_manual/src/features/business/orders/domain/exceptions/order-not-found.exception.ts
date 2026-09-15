import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class OrderNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Pedido', id);
  }
}
