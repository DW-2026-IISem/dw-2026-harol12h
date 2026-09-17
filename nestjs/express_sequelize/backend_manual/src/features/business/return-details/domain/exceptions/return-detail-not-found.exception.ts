import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class ReturnDetailNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Detalle de devolución', id);
  }
}
