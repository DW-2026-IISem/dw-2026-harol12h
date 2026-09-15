import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
import { Status } from '../../../../../common/enums/status.enum.js';

export interface ProductProps {
  name: string;
  brand: string;
  price: number;
  minStock: number;
  quantity: number;
  productTypeId: number;
  collectionId: number;
  status?: Status;
}

export class Product {
  private constructor(
    public readonly id: number | null,
    public readonly name: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly minStock: number,
    public readonly quantity: number,
    public readonly productTypeId: number,
    public readonly collectionId: number,
    public readonly status: Status,
  ) {
    if (price <= 0) throw new DomainException('Precio inválido');
    if (minStock < 0) throw new DomainException('Stock mínimo inválido');
  }

  static create(props: ProductProps): Product {
    return new Product(
      null,
      props.name,
      props.brand,
      props.price,
      props.minStock,
      props.quantity,
      props.productTypeId,
      props.collectionId,
      props.status ?? Status.ACTIVE,
    );
  }
}
