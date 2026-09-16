export interface InventoryProps {
  id?: number;
  branchId: number;
  variantId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Inventory {
  id?: number;
  branchId: number;
  variantId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: InventoryProps) {
    this.id = props.id;
    this.branchId = props.branchId;
    this.variantId = props.variantId;
    this.quantity = props.quantity;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<InventoryProps, 'id' | 'createdAt' | 'updatedAt'>): Inventory {
    if (props.quantity < 0) throw new Error('La cantidad no puede ser negativa');
    return new Inventory(props);
  }

  static reconstitute(props: InventoryProps): Inventory {
    return new Inventory(props);
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity < 0) throw new Error('La cantidad no puede ser negativa');
    this.quantity = newQuantity;
  }
}
