import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class PromotionNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Promoción', id);
  }
}
