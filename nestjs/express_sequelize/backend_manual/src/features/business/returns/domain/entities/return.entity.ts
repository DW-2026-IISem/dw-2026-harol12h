export interface ReturnProps {
  id?: number;
  orderId: number;
  date: Date;
  reason: string;
  total: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Return {
  id?: number;
  orderId: number;
  date: Date;
  reason: string;
  total: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ReturnProps) {
    this.id = props.id;
    this.orderId = props.orderId;
    this.date = props.date;
    this.reason = props.reason;
    this.total = props.total;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<ReturnProps, 'id' | 'createdAt' | 'updatedAt'>): Return {
    if (props.total < 0) throw new Error('El total no puede ser negativo');
    return new Return(props);
  }

  static reconstitute(props: ReturnProps): Return {
    return new Return(props);
  }
}
