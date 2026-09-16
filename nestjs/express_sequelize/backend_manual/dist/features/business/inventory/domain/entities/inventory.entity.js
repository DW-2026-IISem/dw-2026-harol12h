export class Inventory {
    id;
    branchId;
    variantId;
    quantity;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.branchId = props.branchId;
        this.variantId = props.variantId;
        this.quantity = props.quantity;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(props) {
        if (props.quantity < 0)
            throw new Error('La cantidad no puede ser negativa');
        return new Inventory(props);
    }
    static reconstitute(props) {
        return new Inventory(props);
    }
    updateQuantity(newQuantity) {
        if (newQuantity < 0)
            throw new Error('La cantidad no puede ser negativa');
        this.quantity = newQuantity;
    }
}
//# sourceMappingURL=inventory.entity.js.map