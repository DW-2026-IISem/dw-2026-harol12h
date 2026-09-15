export interface OrderProps {
  id?: number;
  clientId: number;
  orderDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order {
  id?: number;
  clientId: number;
  orderDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: OrderProps) {
    this.id = props.id;
    this.clientId = props.clientId;
    this.orderDate = props.orderDate;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<OrderProps, 'id' | 'createdAt' | 'updatedAt'>): Order {
    if (!props.clientId) throw new Error('El pedido debe tener cliente');
    if (!props.orderDate) throw new Error('El pedido debe tener fecha');
    return new Order(props);
  }

  static reconstitute(props: OrderProps): Order {
    return new Order(props);
  }

  updateStatus(status: string): void {
    this.status = status;
  }
}
