export interface ReturnDetailProps {
  id?: number;
  returnId: number;
  productId: number;
  quantity: number;
  reason: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ReturnDetail {
  id?: number;
  returnId: number;
  productId: number;
  quantity: number;
  reason: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ReturnDetailProps) {
    this.id = props.id;
    this.returnId = props.returnId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.reason = props.reason;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<ReturnDetailProps, 'id' | 'createdAt' | 'updatedAt'>): ReturnDetail {
    if (props.quantity <= 0) throw new Error('La cantidad debe ser mayor a cero');
    return new ReturnDetail(props);
  }

  static reconstitute(props: ReturnDetailProps): ReturnDetail {
    return new ReturnDetail(props);
  }
}
