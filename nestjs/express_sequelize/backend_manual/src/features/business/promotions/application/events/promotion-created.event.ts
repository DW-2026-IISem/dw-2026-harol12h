export class PromotionCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly discountPercentage: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly active: boolean,
    public readonly createdAt: Date,
  ) {}
}
