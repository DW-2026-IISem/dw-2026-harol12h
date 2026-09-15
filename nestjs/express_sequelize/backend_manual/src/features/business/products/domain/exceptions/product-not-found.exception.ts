import { DomainException } from '../../../../../common/exceptions/domain.exception.js';

export class ProductNotFoundException extends DomainException {
  constructor(id: number) {
    super(`El producto con ID ${id} no existe.`);
  }
}
