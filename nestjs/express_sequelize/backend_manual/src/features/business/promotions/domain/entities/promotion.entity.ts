export interface PromotionProps {
  id?: number;
  name: string;
  description: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Promotion {
  id?: number;
  name: string;
  description: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PromotionProps) {
    Object.assign(this, props);
  }

  static create(props: Omit<PromotionProps, 'id' | 'createdAt' | 'updatedAt'>): Promotion {
    if (props.discountPercentage <= 0 || props.discountPercentage > 100) {
      throw new Error('El porcentaje de descuento debe estar entre 1 y 100');
    }
    return new Promotion(props);
  }

  static reconstitute(props: PromotionProps): Promotion {
    return new Promotion(props);
  }
}
