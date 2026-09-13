import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class CollectionNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Colección', id);
  }
}
