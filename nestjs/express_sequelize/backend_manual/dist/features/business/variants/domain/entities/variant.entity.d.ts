export interface VariantProps {
    id?: number;
    productId: number;
    name: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Variant {
    id?: number;
    productId: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<VariantProps, 'id' | 'createdAt' | 'updatedAt'>): Variant;
    static reconstitute(props: VariantProps): Variant;
    update(props: Partial<Omit<VariantProps, 'id' | 'createdAt' | 'updatedAt'>>): void;
}
