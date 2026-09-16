export class Branch {
    id;
    name;
    description;
    isActive;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (!props.name?.trim())
            throw new Error('El nombre de la sucursal es requerido');
        return new Branch(props);
    }
    static reconstitute(props) {
        return new Branch(props);
    }
    update(props) {
        if (props.name !== undefined)
            this.name = props.name;
        if (props.description !== undefined)
            this.description = props.description;
        if (props.isActive !== undefined)
            this.isActive = props.isActive;
    }
}
//# sourceMappingURL=branch.entity.js.map