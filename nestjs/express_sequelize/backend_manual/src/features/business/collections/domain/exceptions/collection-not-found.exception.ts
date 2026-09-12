import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class CollectionNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Colección', id);
  }
}
