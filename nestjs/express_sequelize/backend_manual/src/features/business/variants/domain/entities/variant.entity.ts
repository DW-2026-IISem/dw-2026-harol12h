export interface VariantProps {
  id?: number;
  productId: number;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Variant {
  id?: number;
  productId: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: VariantProps) {
    this.id = props.id;
    this.productId = props.productId;
    this.name = props.name;
    this.description = props.description;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<VariantProps, 'id' | 'createdAt' | 'updatedAt'>): Variant {
    if (!props.name?.trim()) throw new Error('El nombre de la variante es requerido');
    return new Variant(props);
  }

  static reconstitute(props: VariantProps): Variant {
    return new Variant(props);
  }

  update(props: Partial<Omit<VariantProps, 'id' | 'createdAt' | 'updatedAt'>>): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) throw new Error('El nombre de la variante es requerido');
      this.name = props.name;
    }
    if (props.description !== undefined) this.description = props.description;
    if (props.isActive !== undefined) this.isActive = props.isActive;
  }
}
