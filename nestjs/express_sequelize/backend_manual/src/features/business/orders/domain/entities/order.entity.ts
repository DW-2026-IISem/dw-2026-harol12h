import { DomainException } from '../../../../../common/exceptions/domain.exception.js';

export class Order {
  constructor(
    public readonly id: number | null,
    public readonly clientId: number,
    public readonly orderDate: Date,
    public readonly status: string,
  ) {
    if (!clientId) {
      throw new DomainException('El pedido debe estar asociado a un cliente.');
    }
    if (!orderDate) {
      throw new DomainException('El pedido debe tener una fecha.');
    }
  }

  static create(props: {
    clientId: number;
    orderDate: Date;
    status: string;
  }): Order {
    return new Order(null, props.clientId, props.orderDate, props.status);
  }
}
