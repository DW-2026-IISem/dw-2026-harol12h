export class PromotionUpdatedEvent {
    id;
    name;
    discountPercentage;
    startDate;
    endDate;
    active;
    updatedAt;
    constructor(id, name, discountPercentage, startDate, endDate, active, updatedAt) {
        this.id = id;
        this.name = name;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
        this.updatedAt = updatedAt;
    }
}
//# sourceMappingURL=promotion-updated.event.js.map