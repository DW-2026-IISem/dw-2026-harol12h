export interface BranchProps {
  id?: number;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Branch {
  id?: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: BranchProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<BranchProps, 'id' | 'createdAt' | 'updatedAt'>): Branch {
    if (!props.name?.trim()) throw new Error('El nombre de la sucursal es requerido');
    return new Branch(props);
  }

  static reconstitute(props: BranchProps): Branch {
    return new Branch(props);
  }

  update(props: Partial<Omit<BranchProps, 'id'>>): void {
    if (props.name !== undefined) this.name = props.name;
    if (props.description !== undefined) this.description = props.description;
    if (props.isActive !== undefined) this.isActive = props.isActive;
  }
}
