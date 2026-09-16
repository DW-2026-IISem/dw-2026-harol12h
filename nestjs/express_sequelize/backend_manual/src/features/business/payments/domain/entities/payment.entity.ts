export interface PaymentProps {
  id?: number;
  orderId: number;
  method: string;
  amount: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  id?: number;
  orderId: number;
  method: string;
  amount: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PaymentProps) {
    this.id = props.id;
    this.orderId = props.orderId;
    this.method = props.method;
    this.amount = props.amount;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<PaymentProps, 'id' | 'createdAt' | 'updatedAt'>): Payment {
    if (props.amount <= 0) throw new Error('El monto debe ser mayor a cero');
    return new Payment(props);
  }

  static reconstitute(props: PaymentProps): Payment {
    return new Payment(props);
  }
}
