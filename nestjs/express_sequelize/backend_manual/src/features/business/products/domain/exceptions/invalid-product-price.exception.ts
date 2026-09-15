import { DomainException } from '../../../../../common/exceptions/domain.exception.js';

export class InvalidProductPriceException extends DomainException {
  constructor(price: number) {
    super(`El precio '${price}' no es válido`);
  }
}
