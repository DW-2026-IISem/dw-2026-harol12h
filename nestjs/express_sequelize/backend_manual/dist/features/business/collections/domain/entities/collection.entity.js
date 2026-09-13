export class Collection {
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
        if (!props.name?.trim()) {
            throw new Error('El nombre de la colección es requerido');
        }
        return new Collection(props);
    }
    static reconstitute(props) {
        return new Collection(props);
    }
    update(props) {
        if (props.name !== undefined) {
            if (!props.name.trim()) {
                throw new Error('El nombre de la colección es requerido');
            }
            this.name = props.name;
        }
        if (props.description !== undefined) {
            this.description = props.description;
        }
    }
    deactivate() {
        this.isActive = false;
    }
    activate() {
        this.isActive = true;
    }
}
//# sourceMappingURL=collection.entity.js.map