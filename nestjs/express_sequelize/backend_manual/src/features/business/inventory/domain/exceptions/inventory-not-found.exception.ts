import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class InventoryNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Inventario', id);
  }
}
