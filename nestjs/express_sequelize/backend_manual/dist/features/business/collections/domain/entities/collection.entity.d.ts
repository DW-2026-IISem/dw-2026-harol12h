export interface CollectionProps {
    id?: number;
    name: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Collection {
    id?: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<CollectionProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>): Collection;
    static reconstitute(props: CollectionProps): Collection;
    update(props: Partial<Omit<CollectionProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
    activate(): void;
}
