import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class VariantNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Variante', id);
  }
}
