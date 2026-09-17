export class Promotion {
    id;
    name;
    description;
    discountPercentage;
    startDate;
    endDate;
    active;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(props) {
        if (props.discountPercentage <= 0 || props.discountPercentage > 100) {
            throw new Error('El porcentaje de descuento debe estar entre 1 y 100');
        }
        return new Promotion(props);
    }
    static reconstitute(props) {
        return new Promotion(props);
    }
}
//# sourceMappingURL=promotion.entity.js.map