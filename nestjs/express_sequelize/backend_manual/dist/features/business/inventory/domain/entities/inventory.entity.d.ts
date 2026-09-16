export interface InventoryProps {
    id?: number;
    branchId: number;
    variantId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Inventory {
    id?: number;
    branchId: number;
    variantId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<InventoryProps, 'id' | 'createdAt' | 'updatedAt'>): Inventory;
    static reconstitute(props: InventoryProps): Inventory;
    updateQuantity(newQuantity: number): void;
}
