export interface OrderDetailProps {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrderDetail {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: OrderDetailProps) {
    this.id = props.id;
    this.orderId = props.orderId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<OrderDetailProps, 'id' | 'createdAt' | 'updatedAt'>): OrderDetail {
    if (props.quantity <= 0) throw new Error('La cantidad debe ser mayor a cero');
    if (props.unitPrice <= 0) throw new Error('El precio unitario debe ser mayor a cero');
    return new OrderDetail(props);
  }

  static reconstitute(props: OrderDetailProps): OrderDetail {
    return new OrderDetail(props);
  }

  update(props: Partial<Omit<OrderDetailProps, 'id'>>): void {
    if (props.quantity !== undefined) this.quantity = props.quantity;
    if (props.unitPrice !== undefined) this.unitPrice = props.unitPrice;
  }
}
