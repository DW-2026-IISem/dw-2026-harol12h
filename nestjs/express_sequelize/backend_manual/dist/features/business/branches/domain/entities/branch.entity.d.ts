export interface BranchProps {
    id?: number;
    name: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Branch {
    id?: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<BranchProps, 'id' | 'createdAt' | 'updatedAt'>): Branch;
    static reconstitute(props: BranchProps): Branch;
    update(props: Partial<Omit<BranchProps, 'id'>>): void;
}
