import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class ReturnNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Devolución', id);
  }
}
