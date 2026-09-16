export class Variant {
    id;
    productId;
    name;
    description;
    isActive;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.productId = props.productId;
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.name?.trim())
            throw new Error('El nombre de la variante es requerido');
        return new Variant(props);
    }
    static reconstitute(props) {
        return new Variant(props);
    }
    update(props) {
        if (props.name !== undefined) {
            if (!props.name.trim())
                throw new Error('El nombre de la variante es requerido');
            this.name = props.name;
        }
        if (props.description !== undefined)
            this.description = props.description;
        if (props.isActive !== undefined)
            this.isActive = props.isActive;
    }
}
//# sourceMappingURL=variant.entity.js.map