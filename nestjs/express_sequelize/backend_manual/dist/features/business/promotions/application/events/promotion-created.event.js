export class PromotionCreatedEvent {
    id;
    name;
    discountPercentage;
    startDate;
    endDate;
    active;
    createdAt;
    constructor(id, name, discountPercentage, startDate, endDate, active, createdAt) {
        this.id = id;
        this.name = name;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=promotion-created.event.js.map